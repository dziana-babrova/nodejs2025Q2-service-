import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, UserEntity } from './user.dto';
import { User } from './user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private readonly data: Map<string, User> = new Map();
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(data: CreateUserDto) {
    const password = await bcrypt.hash(
      data.password,
      parseInt(this.configService.get<string>('CRYPT_SALT'), 10),
    );

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password,
      },
    });
    return plainToClass(UserEntity, user);
  }

  async getAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => plainToClass(UserEntity, user));
  }

  async get(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return plainToClass(UserEntity, user);
  }

  async getByLogin(login: string) {
    return this.prisma.user.findUnique({
      where: {
        login,
      },
    });
  }

  async update({ id, ...dto }: UpdatePasswordDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { id, ...dto },
    });
    return plainToClass(UserEntity, user);
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
