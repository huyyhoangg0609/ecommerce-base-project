import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT);

  console.log(`${process.env.APP_NAME} application is running on PORT:`, process.env.APP_PORT);

}

bootstrap();
