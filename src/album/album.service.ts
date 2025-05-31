import { Injectable } from '@nestjs/common';
import { Album } from './album.interface';
import { v4 as uuidv4 } from 'uuid';
import { createAlbumDto, updateAlbumDto } from './album.dto';

@Injectable()
export class AlbumService {
  private readonly data: Map<string, Album> = new Map();

  async create(dto: createAlbumDto) {
    const id = uuidv4();
    const item: Album = {
      id,
      ...dto,
    };
    console.log(id, dto);
    this.data.set(item.id, item);
    return this.get(id);
  }

  async getAll(): Promise<Album[]> {
    return [...this.data.values()];
  }

  async get(id: string): Promise<Album | null> {
    return this.data.get(id);
  }

  async update(id: string, updateDto: updateAlbumDto): Promise<Album | null> {
    const updatedItem = {
      id,
      ...updateDto,
    };
    this.data.set(id, updatedItem);
    return this.get(id);
  }

  async delete(id: string) {
    this.data.delete(id);
  }
}
