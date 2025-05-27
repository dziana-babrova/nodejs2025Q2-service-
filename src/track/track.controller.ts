import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { createTrackDto, updateTrackDto } from './track.interface';

@Controller('tracks')
export class TrackController {
  constructor(private service: TrackService) {}

  @Post()
  create(@Body() createDto: createTrackDto) {
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
  update(@Param('id') id: string, @Body() updateDto: updateTrackDto) {
    this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.service.delete(id);
  }
}
