import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { createAlbumDto, updateAlbumDto } from './album.dto';
import { ValidateAlbumPipe } from './validate-album.pipe';

@Controller('album')
export class AlbumController {
  constructor(private service: AlbumService) {}

  @Get()
  async findAll() {
    return this.service.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ValidateAlbumPipe) id: string) {
    return this.service.get(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createDto: createAlbumDto) {
    console.log(createDto);
    return this.service.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id', ValidateAlbumPipe) id: string,
    @Body() updateDto: updateAlbumDto,
  ) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ValidateAlbumPipe) id: string) {
    await this.service.delete(id);
  }
}
