import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserToken } from '../interfaces/userInterface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
