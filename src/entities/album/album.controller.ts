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
import { AlbumService } from './album.service';
import { createAlbumDto, updateAlbumDto } from './album.dto';
import { ValidateAlbumPipe } from './validate-album.pipe';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('album')
export class AlbumController {
  constructor(private service: AlbumService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.service.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ValidateAlbumPipe) id: string) {
    return this.service.get(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async create(@Body() createDto: createAlbumDto) {
    return this.service.create(createDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ValidateAlbumPipe) id: string,
    @Body() updateDto: updateAlbumDto,
  ) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async remove(@Param('id', ValidateAlbumPipe) id: string) {
    await this.service.delete(id);
  }
}
