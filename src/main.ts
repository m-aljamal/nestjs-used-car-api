import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ! move it to the gloable in the app.modul.ts
  // // add validation to the app
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     // make sure to delete any additional data in the
  //     // request body that is not used in the app
  //     whitelist: true,
  //   }),
  // );
  await app.listen(3000);
}
bootstrap();
