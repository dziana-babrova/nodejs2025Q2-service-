import {
  Injectable,
  PipeTransform,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { ERRORS } from 'src/consts/ERRORS';
import { UpdatePasswordDto } from './user.dto';
import { isUUID } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ValidateUserUpdatePipe implements PipeTransform {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async transform(data: UpdatePasswordDto & { id: string }) {
    if (!isUUID(data.id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }
    const user = await this.prisma.user.findUnique({
      where: { id: data.id },
    });
    if (!user) {
      throw new NotFoundException(ERRORS.NOT_FOUND('User'));
    }

    if (!(await bcrypt.compare(data.oldPassword, user.password))) {
      throw new ForbiddenException(ERRORS.INCORRECT_PASSWORD());
    }
    return {
      ...user,
      version: ++user.version,
      updatedAt: new Date(),
      password: await bcrypt.hash(
        data.newPassword,
        parseInt(this.configService.get<string>('CRYPT_SALT'), 10),
      ),
    };
  }
}

@Injectable()
export class ValidateUserPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(ERRORS.NOT_FOUND('User'));
    }
    return id;
  }
}
