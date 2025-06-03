import { v4 as uuidv4 } from 'uuid';
import { Track } from './track.interface';
import { createTrackDto, updateTrackDto } from './track.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavoritesService } from 'src/entities/favorites/favorites.service';

@Injectable()
export class TrackService {
  private readonly data: Map<string, Track> = new Map();

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async create(dto: createTrackDto) {
    const id = uuidv4();
    const item = {
      id,
      ...dto,
    };
    this.data.set(id, item);
    return this.get(id);
  }

  async getAll(): Promise<Track[]> {
    return [...this.data.values()];
  }

  async get(id: string): Promise<Track | null> {
    return this.data.get(id);
  }

  async update(id: string, updateDto: updateTrackDto) {
    const updatedItem = {
      id,
      ...updateDto,
    };
    this.data.set(id, updatedItem);
    return this.get(id);
  }

  async delete(id: string) {
    this.data.delete(id);
    this.favoritesService.deleteTrack(id);
  }

  async updateArtistToNull(artistId: string) {
    [...this.data.values()]
      .filter((track) => track.artistId === artistId)
      .forEach((track) => {
        this.data.set(track.id, { ...track, artistId: null });
      });
  }

  async updateAlbumToNull(albumId: string) {
    [...this.data.values()]
      .filter((album) => album.albumId === albumId)
      .forEach((album) => {
        this.data.set(album.id, { ...album, albumId: null });
      });
  }
}
