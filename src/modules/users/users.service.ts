import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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
    return this.userModel.findOne({ username });
  }

  async compareUserPasswords(plaintextPass: string, hash: string) {
    return bcrypt.compare(plaintextPass, hash);
  }

  async saveUser(userDTO: UserDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userDTO.password, saltRounds);
    return this.userModel.create({ ...userDTO, password: hashedPassword });
  }
}
