import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import { UsersService } from '../users/users.service';
import { User } from '../users/interfaces/user.interface';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async findUser(username: string, pass: string) {
    const user = await this.usersService.findUser(username);
    if (!user) {
      return null;
    }
    const passwordMatch = await this.usersService.compareUserPasswords(
      pass,
      user.password,
    );
    if (!passwordMatch) {
      return null;
    }
    return _.omit(user, 'password');
  }

  async validateUser(username: string) {
    const existedUser = await this.usersService.findUser(username);
    return !existedUser;
  }

  login(user: User) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(userDTO: UserDto) {
    const user = await this.usersService.saveUser(userDTO);
    return this.login(user);
  }
}
