import { Injectable } from '@nestjs/common';
import { Favorites } from './favorites.interface';
import { Album } from 'src/album/album.interface';
import { Track } from 'src/track/track.interface';
import { Artist } from 'src/artist/artist.interface';

@Injectable()
export class FavoritesService {
  private readonly data: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor() {}

  async addAlbum(item: Album) {
    this.data.albums.push(item);
  }
  async addTrack(item: Track) {
    this.data.tracks.push(item);
  }
  async addArtist(item: Artist) {
    this.data.artists.push(item);
  }

  async getAll(): Promise<Favorites> {
    return this.data;
  }

  async deleteAlbum(id: string) {
    const index = this.data.albums.findIndex((album) => album.id === id);
    if (index !== -1) {
      this.data.albums.splice(index, 1);
    }
  }
  async deleteTrack(id: string) {
    const index = this.data.tracks.findIndex((track) => track.id === id);
    if (index !== -1) {
      this.data.tracks.splice(index, 1);
    }
  }
  async deleteArtist(id: string) {
    const index = this.data.artists.findIndex((artist) => artist.id === id);
    if (index !== -1) {
      this.data.artists.splice(index, 1);
    }
  }
}
