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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { ValidateUserPipe, ValidateUserUpdatePipe } from './validate-user.pipe';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return this.service.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ValidateUserPipe) id: string) {
    return this.service.get(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createDto: CreateUserDto) {
    return this.service.create(createDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @UseGuards(AuthGuard)
  @UsePipes(ValidateUserUpdatePipe)
  async update(@Body() updateDto: UpdatePasswordDto) {
    return this.service.update(updateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async remove(@Param('id', ValidateUserPipe) id: string) {
    await this.service.delete(id);
  }
}
