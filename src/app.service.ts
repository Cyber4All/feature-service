import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getBase(): string {
    return 'Welcome to CLARK Feature-Service';
  }
}
