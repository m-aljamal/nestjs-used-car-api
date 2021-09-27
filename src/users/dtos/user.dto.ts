import { Expose } from 'class-transformer';

export class UserDto {
  @Expose() // means return this info for user
  id: number;
  @Expose()
  email: string;
}
