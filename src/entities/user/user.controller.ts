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
import { ValidateUserPipe, ValidateUserUpdatePipe } from './validate-user.pipe';
import { User } from './user.interface';

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
    return [...response];
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id', ValidateUserPipe) id: string) {
    const user = await this.service.get(id);
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
  @UsePipes(ValidateUserUpdatePipe, ValidationPipe)
  async update(@Body() updateDto: User) {
    const updatedUser = await this.service.update(updateDto);
    return new UserEntity(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ValidateUserPipe) id: string) {
    await this.service.delete(id);
  }
}
