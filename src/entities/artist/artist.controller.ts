import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { createArtistDto, updateArtistDto } from './artist.dto';
import { ValidateArtistPipe } from './validate-artist.pipe';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('artist')
export class ArtistController {
  constructor(private service: ArtistService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return this.service.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ValidateArtistPipe) id: string) {
    return this.service.get(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async create(@Body() createDto: createArtistDto) {
    return this.service.create(createDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ValidateArtistPipe) id: string,
    @Body() updateDto: updateArtistDto,
  ) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async remove(@Param('id', ValidateArtistPipe) id: string) {
    await this.service.delete(id);
  }
}
