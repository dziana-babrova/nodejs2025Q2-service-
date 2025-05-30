import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Album } from './album.interface';
import { AlbumsService } from './album.service';
import { Response } from 'express';

@Controller('album')
export class AlbumsController {
  constructor(private service: AlbumsService) {}

  @Post()
  create(@Body() createDto: Album, @Res() res: Response) {
    this.service.create(createDto);
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(@Res({ passthrough: true }) res: Response) {
    const data = this.service.getAll();
    res.status(HttpStatus.OK).json(data).send();
    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: Album) {
    this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.service.delete(id);
  }
}
