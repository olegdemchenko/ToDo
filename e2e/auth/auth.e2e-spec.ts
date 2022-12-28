import { Test } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../../src/modules/auth/auth.controller';
import { AuthService } from '../../src/modules/auth/auth.service';
import { LoginStrategy } from '../../src/modules/auth/strategies/login.strategy';
import { SignupStrategy } from '../../src/modules/auth/strategies/signUp.strategy';
import { JwtStrategy } from '../../src/modules/auth/strategies/jwt.strategy';
import { UsersService } from '../../src/modules/users/users.service';
import { UserDto } from '../../src/modules/users/dto/user.dto';
import { jwtConstants } from '../../src/modules/auth/constants';
import { INestApplication } from '@nestjs/common';

const fakeUser = {
  _id: '1',
  username: 'fakeUser',
  password: 'fakeuserPassword',
};

describe('authService', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const mockedUsersService = {
      findUser: async (username: string) => {
        return username === fakeUser.username ? fakeUser : null;
      },

      compareUserPasswords: async (testPass: string, correctPass: string) =>
        testPass === correctPass,

      saveUser: async (user: UserDto) => user,
    };
    const moduleRef = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '3600s' },
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

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('POST /auth/login Success', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(_.omit(fakeUser, '_id'))
      .expect(201);
  });

  it('POST /auth/login Unauthorized', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'nonexisteduser', password: 'nonexistedpassword' })
      .expect(401);
  });

  it('POST /auth/signup Success', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username: 'nonexisteduser', password: 'nonexistedpassword' })
      .expect(201);
  });

  it('POST /auth/login Forbidden', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(fakeUser)
      .expect(403);
  });

  afterAll(async () => {
    await app.close();
  });
});
