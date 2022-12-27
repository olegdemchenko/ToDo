import { Test } from '@nestjs/testing';
import * as _ from 'lodash';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginStrategy } from './login.strategy';
import { SignupStrategy } from './signUp.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/interfaces/user.interface';

const fakeUser = {
  _id: '1',
  username: 'fakeUser',
  password: 'fakeuserPassword',
};

describe('authService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const mockedUsersService = {
      findUser: async (username: string) => {
        return username === fakeUser.username ? fakeUser : null;
      },

      compareUserPasswords: async (testPass: string, correctPass: string) =>
        testPass === correctPass,

      saveUser: async (user: UserDto) => user,
    };
    const authModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => {
            return {
              secret: configService.get('SECRET_KEY'),
              signOptions: { expiresIn: '3600s' },
            };
          },
          inject: [ConfigService],
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        LoginStrategy,
        SignupStrategy,
        JwtStrategy,
        { provide: UsersService, useValue: mockedUsersService },
      ],
    }).compile();

    authService = authModule.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('should return a user object when credentials are valid', async () => {
      expect(
        await authService.findUser(fakeUser.username, fakeUser.password),
      ).toEqual(_.omit(fakeUser, 'password'));
    });

    it('should return null when credentials are invalid', async () => {
      expect(await authService.findUser('wrongname', 'wrongpass')).toBeNull();
    });
  });

  describe('validateLogin', () => {
    it('should return JWT object when credentials are valid', async () => {
      expect(authService.login(fakeUser as User)).toHaveProperty(
        'access_token',
      );
    });
  });
});
