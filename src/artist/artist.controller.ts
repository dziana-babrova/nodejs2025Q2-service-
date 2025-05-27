import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ArtistsService } from './artist.service';
import { createArtistDto, updateArtistDto } from './artist.interface';

@Controller('artists')
export class ArtistsController {
  constructor(private service: ArtistsService) {}

  @Post()
  create(@Body() createDto: createArtistDto) {
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
  update(@Param('id') id: string, @Body() updateDto: updateArtistDto) {
    this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.service.delete(id);
  }
}
