import { Injectable } from '@nestjs/common';
import { Album, createAlbumDto } from './album.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  private readonly albums: Map<string, Album> = new Map();

  create(createAlbumDto: createAlbumDto) {
    const id = uuidv4();
    const album = {
      id,
      ...createAlbumDto,
    };
    this.albums.set(album.id, album);
  }

  getAll(): Album[] {
    return [...this.albums.values()];
  }

  get(id: string): Album {
    return this.albums.get(id);
  }

  update(id: string, album: Album) {
    return this.albums.set(id, album);
  }

  delete(id: string) {
    this.albums.delete(id);
  }
}
