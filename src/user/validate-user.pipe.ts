import {
  Injectable,
  PipeTransform,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ERRORS } from 'src/consts/ERRORS';
import { UpdatePasswordDto } from './user.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ValidateUserPipe implements PipeTransform {
  constructor(private readonly usersService: UserService) {}

  async transform(data: UpdatePasswordDto & { id: string }) {
    const user = await this.usersService.get(data.id);
    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    if (data.oldPassword !== user.password) {
      throw new ForbiddenException(ERRORS.INCORRECT_PASSWORD);
    }
    if (!isUUID(data.id)) {
      throw new BadRequestException(ERRORS.NOT_UUID);
    }
    return { ...data };
  }
}
