import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { ValidateUserPipe, ValidateUserUpdatePipe } from './validate-user.pipe';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    return this.service.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id', ValidateUserPipe) id: string) {
    return this.service.get(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createDto: CreateUserDto) {
    return this.service.create(createDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @UsePipes(ValidateUserUpdatePipe)
  async update(@Body() updateDto: UpdatePasswordDto) {
    return this.service.update(updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ValidateUserPipe) id: string) {
    await this.service.delete(id);
  }
}
