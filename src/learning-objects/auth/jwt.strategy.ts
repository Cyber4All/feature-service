import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserToken } from '../interfaces/userInterface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.KEY,
    });
  }

  // Validate Access Groups
  async validate(payload: UserToken) {
    if (payload.accessGroups === undefined || !this.isAdminOrEditor(payload.accessGroups)) {
      throw new UnauthorizedException('You have to be an admin or editor in order to update feature learning objects')
    }
    return payload;
  }

  // Determine if the requester is an admin or editor
  isAdminOrEditor(userGroup: string[]): Boolean {
    return userGroup.includes('editor') || userGroup.includes('admin');
  }
}