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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { ERRORS } from 'src/consts/ERRORS';
import { ValidateUserPipe } from './validate-user.pipe';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  async findAll() {
    const users = await this.service.getAll();
    const response = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...newUser } = user;
      return newUser;
    });
    return response;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.service.get(id);
    if (!user) {
      throw new HttpException(ERRORS.NOT_FOUND('User'), HttpStatus.NOT_FOUND);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUser } = user;
    return newUser;
  }

  @Post()
  async create(@Body() createDto: CreateUserDto) {
    const user = await this.service.create(createDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUser } = user;
    return newUser;
  }

  @Put(':id')
  @UsePipes(ValidateUserPipe, ValidationPipe)
  async update(@Body() updateDto: UpdatePasswordDto) {
    const updatedUser = await this.service.update(updateDto);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUser } = updatedUser;
    return newUser;
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
