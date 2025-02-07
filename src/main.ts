import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow cookies or credentials
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log('Server is running on http://localhost:3000');
}
bootstrap();
