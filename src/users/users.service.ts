import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // repo is argument
  // @InjectRepository(User) ingiction system
  // tell the system we need user repository
  // this required becasuse of the genarc type Repository<User>

  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, password: string) {
    // create function will not save data to database on create instant

    const user = this.repo.create({ email, password });
    // save take intity and save it to databse
    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne(id);
  }

  find(email: string) {
    return this.repo.find({ email });
  }
  // Partial is a type helper in typescript tell attrs could be any object that has some property from user
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs); // take the attrs and copy them into user
    console.log('user', user);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('user not found');
    return this.repo.remove(user);
  }
}
