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
import { TrackService } from './track.service';
import { createTrackDto, updateTrackDto } from './track.dto';
import { ValidateTrackPipe } from './validate-track.pipe';

@Controller('track')
export class TrackController {
  constructor(private service: TrackService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createDto: createTrackDto) {
    return this.service.create(createDto);
  }

  @Get()
  async findAll() {
    return this.service.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ValidateTrackPipe) id: string) {
    return this.service.get(id);
  }

  @Put(':id')
  async update(
    @Param('id', ValidateTrackPipe) id: string,
    @Body() updateDto: updateTrackDto,
  ) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ValidateTrackPipe) id: string) {
    this.service.delete(id);
  }
}
