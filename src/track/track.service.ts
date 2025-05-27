import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { createTrackDto, Track, updateTrackDto } from './track.interface';

@Injectable()
export class TrackService {
  private readonly data: Map<string, Track> = new Map();

  create(dto: createTrackDto) {
    const id = uuidv4();
    const item = {
      id,
      ...dto,
    };
    this.data.set(item.id, item);
  }

  getAll(): Track[] {
    return [...this.data.values()];
  }

  get(id: string): Track {
    return this.data.get(id);
  }

  update(id: string, updateDto: updateTrackDto) {
    const updatedItem = {
      id,
      ...updateDto,
    };
    return this.data.set(id, updatedItem);
  }

  delete(id: string) {
    this.data.delete(id);
  }
}
