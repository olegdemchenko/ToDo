import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'login') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    console.log('login strategy');
    const user = await this.authService.findUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
