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
import { ValidateArtistExistsPipe } from './validate-artist.pipe';

@Controller('artist')
export class ArtistController {
  constructor(private service: ArtistService) {}

  @Get()
  async findAll() {
    return this.service.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ValidateArtistExistsPipe) id: string) {
    return this.service.get(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createDto: createArtistDto) {
    return this.service.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id', ValidateArtistExistsPipe) id: string,
    @Body() updateDto: updateArtistDto,
  ) {
    console.log(id, updateDto);
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ValidateArtistExistsPipe) id: string) {
    await this.service.delete(id);
  }
}
