import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Validate request's data
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }))
  await app.listen(process.env.APP_PORT);
  console.log(`${process.env.APP_NAME} application is running on PORT:`, process.env.APP_PORT);
}

bootstrap();
