import { IsNotEmpty, IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string; // uuid v4
  login: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

export class CreateUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  oldPassword: string; // previous password

  @IsNotEmpty()
  newPassword: string; // new password
}
