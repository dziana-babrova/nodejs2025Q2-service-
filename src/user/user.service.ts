import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto, UpdatePasswordDto, User } from './user.interface';

@Injectable()
export class UsersService {
  private readonly data: Map<string, User> = new Map();

  create(createDto: CreateUserDto) {
    const id = uuidv4();
    const time = new Date().getTime();
    const item = {
      id,
      createdAt: time,
      updatedAt: time,
      version: 1,
      ...createDto,
    };
    this.data.set(item.id, item);
  }

  getAll(): User[] {
    return [...this.data.values()];
  }

  get(id: string): User {
    return this.data.get(id);
  }

  update(id: string, updateDto: UpdatePasswordDto) {
    const oldItem = this.data.get(id);
    const newTime = new Date().getTime();
    const newVersion = oldItem.version++;
    const updatedItem = {
      ...oldItem,
      ...updateDto,
      version: newVersion,
      updatedAt: newTime,
    };
    return this.data.set(id, updatedItem);
  }

  delete(id: string) {
    this.data.delete(id);
  }
}
