import { Injectable } from '@nestjs/common';
import { Favorites } from './favorites.interface';
import { Album } from 'src/entities/album/album.interface';
import { Track } from 'src/entities/track/track.interface';
import { Artist } from 'src/entities/artist/artist.interface';

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
    this.data.albums = this.data.albums.filter((album) => album.id !== id);
  }

  async deleteTrack(id: string) {
    this.data.tracks = this.data.tracks.filter((track) => track.id !== id);
  }

  async deleteArtist(id: string) {
    this.data.artists = this.data.artists.filter((artist) => artist.id !== id);
  }

  async findAlbum(id: string) {
    return this.data.albums.find((album) => album.id === id);
  }

  async findTrack(id: string) {
    return this.data.tracks.find((track) => track.id === id);
  }

  async findArtist(id: string) {
    return this.data.artists.find((artist) => artist.id === id);
  }
}
