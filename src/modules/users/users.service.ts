import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async findUser(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  async saveUser(userDTO: UserDto) {
    return this.userModel.create(userDTO);
  }
}
