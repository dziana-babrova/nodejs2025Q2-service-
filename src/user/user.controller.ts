import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { UpdatePasswordDto, User } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  create(@Body() createDto: User) {
    this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatePasswordDto) {
    this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.service.delete(id);
  }
}
