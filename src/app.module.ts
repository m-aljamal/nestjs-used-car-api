import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/reports.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      //  create a connection to sqllite database and will be shared to all of the moudle
      type: 'sqlite',
      database: 'db.sqlite',
      // user is from user entity
      entities: [User, Report], // list all things we want to store
      // only used in the development, it will make typeorm to take a look to the structure
      // is the intity and utomaticly migrate the structure of the database
      // ! be carfull only use it for development 
      synchronize: true,

    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
