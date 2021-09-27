import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add validation to the app
  app.useGlobalPipes(
    new ValidationPipe({
      // make sure to delete any additional data in the
      // request body that is not used in the app
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
