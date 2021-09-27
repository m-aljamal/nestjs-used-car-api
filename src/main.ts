import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['assfdfnjgnlfdgkew'],
    }),
  );
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
