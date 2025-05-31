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
import { ArtistService } from './artist.service';
import { createArtistDto, updateArtistDto } from './artist.dto';
import { ValidateArtistPipe } from './validate-artist.pipe';

@Controller('artist')
export class ArtistController {
  constructor(private service: ArtistService) {}

  @Get()
  async findAll() {
    return this.service.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ValidateArtistPipe) id: string) {
    return this.service.get(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createDto: createArtistDto) {
    return this.service.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id', ValidateArtistPipe) id: string,
    @Body() updateDto: updateArtistDto,
  ) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ValidateArtistPipe) id: string) {
    await this.service.delete(id);
  }
}
