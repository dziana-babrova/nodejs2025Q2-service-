import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist, createArtistDto, updateArtistDto } from './artist.interface';

@Injectable()
export class ArtistsService {
  private readonly data: Map<string, Artist> = new Map();

  create(dto: createArtistDto) {
    const id = uuidv4();
    const item = {
      id,
      ...dto,
    };
    this.data.set(item.id, item);
  }

  getAll(): Artist[] {
    return [...this.data.values()];
  }

  get(id: string): Artist {
    return this.data.get(id);
  }

  update(id: string, updateDto: updateArtistDto) {
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
