import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { Album } from './album.interface';
import { AlbumsService } from './album.service';

@Controller('albums')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: Album) {
    this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumsService.get(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: Album) {
    this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.albumsService.delete(id);
  }
}
