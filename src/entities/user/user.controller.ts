import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto, UserEntity } from './user.dto';
import { ERRORS } from 'src/consts/ERRORS';
import { ValidateUserPipe } from './validate-user.pipe';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    const users = await this.service.getAll();
    const response = users.map((user) => {
      return new UserEntity(user);
    });
    return response;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.service.get(id);
    if (!user) {
      throw new HttpException(ERRORS.NOT_FOUND('User'), HttpStatus.NOT_FOUND);
    }
    return new UserEntity(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createDto: CreateUserDto) {
    const user = await this.service.create(createDto);
    return new UserEntity(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @UsePipes(ValidateUserPipe, ValidationPipe)
  async update(@Body() updateDto: UpdatePasswordDto) {
    const updatedUser = await this.service.update(updateDto);
    return new UserEntity(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const deletedUser = await this.service.delete(id);
    if (!deletedUser) {
      throw new HttpException(ERRORS.NOT_FOUND('User'), HttpStatus.NOT_FOUND);
    }
  }
}
