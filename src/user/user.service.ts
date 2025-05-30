import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { User } from './user.interface';

@Injectable()
export class UserService {
  private readonly data: Map<string, User> = new Map();

  async create(createDto: CreateUserDto) {
    const id = uuidv4();
    const time = new Date().getTime();
    const item = {
      id,
      createdAt: time,
      updatedAt: time,
      version: 1,
      login: createDto.login,
      password: createDto.password,
    };
    this.data.set(item.id, item);
    return this.data.get(id);
  }

  async getAll(): Promise<User[]> {
    return [...this.data.values()];
  }

  async get(id: string): Promise<User | null> {
    return this.data.get(id);
  }

  async update({ id, ...dto }: UpdatePasswordDto) {
    console.log(dto);
    const oldItem = this.data.get(id);
    const newTime = new Date().getTime();
    const newVersion = ++oldItem.version;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updatedItem = {
      ...oldItem,
      password: dto.newPassword,
      version: newVersion,
      updatedAt: newTime,
    };
    this.data.set(id, updatedItem);
    return this.get(id);
  }

  async delete(id: string) {
    const doesUserExist = this.get(id);
    this.data.delete(id);
    return doesUserExist;
  }
}
