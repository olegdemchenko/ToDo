import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: `${process.env.SESSION_SECRET}`,
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(5000);
}
bootstrap();
