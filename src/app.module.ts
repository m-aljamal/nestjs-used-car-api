import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/reports.entity';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // test or development env files
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          //  create a connection to sqllite database and will be shared to all of the moudle
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          // user is from user entity
          entities: [User, Report], // list all things we want to store
          // only used in the development, it will make typeorm to take a look to the structure
          // is the intity and utomaticly migrate the structure of the database
          // ! be carfull only use it for development
          synchronize: true,
        };
      },
    }),
    // TypeOrmModule.forRoot({
    //   //  create a connection to sqllite database and will be shared to all of the moudle
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   // user is from user entity
    //   entities: [User, Report], // list all things we want to store
    //   // only used in the development, it will make typeorm to take a look to the structure
    //   // is the intity and utomaticly migrate the structure of the database
    //   // ! be carfull only use it for development
    //   synchronize: true,
    // }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // create a gloable pipe will be applied to every request comming the app
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  // called when app listing to trafic
  // here can setup middle ware that run on every request
  configure(consumer: MiddlewareConsumer) {
    // apply the middleware you want to run
    consumer
      .apply(
        cookieSession({
          keys: ['assfdfnjgnlfdgkew'],
        }),
      )
      .forRoutes('*'); // run on every comming routes   gloable middleware
  }
}
