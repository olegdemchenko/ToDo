import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class SignupStrategy extends PassportStrategy(Strategy, 'signup') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const isUserValid = await this.authService.validateUser(username);
    if (!isUserValid) {
      throw new ForbiddenException();
    }
    return { username, password };
  }
}
