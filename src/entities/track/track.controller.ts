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
import { TrackService } from './track.service';
import { createTrackDto, updateTrackDto } from './track.dto';
import { ValidateTrackPipe } from './validate-track.pipe';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('track')
export class TrackController {
  constructor(private service: TrackService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async create(@Body() createDto: createTrackDto) {
    return this.service.create(createDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return this.service.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ValidateTrackPipe) id: string) {
    return this.service.get(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ValidateTrackPipe) id: string,
    @Body() updateDto: updateTrackDto,
  ) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async remove(@Param('id', ValidateTrackPipe) id: string) {
    this.service.delete(id);
  }
}
