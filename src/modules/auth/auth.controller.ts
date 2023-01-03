import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('login'))
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user._doc);
  }

  @UseGuards(AuthGuard('signup'))
  @Post('signup')
  async signup(@Request() req: any) {
    return this.authService.signUp(req.user);
  }
}
