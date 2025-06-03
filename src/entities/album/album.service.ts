import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Album } from './album.interface';
import { v4 as uuidv4 } from 'uuid';
import { createAlbumDto, updateAlbumDto } from './album.dto';
import { TrackService } from 'src/entities/track/track.service';
import { FavoritesService } from 'src/entities/favorites/favorites.service';

@Injectable()
export class AlbumService {
  private readonly data: Map<string, Album> = new Map();

  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async create(dto: createAlbumDto) {
    const id = uuidv4();
    const item: Album = {
      id,
      ...dto,
    };
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
    this.trackService.updateAlbumToNull(id);
    this.favoritesService.deleteAlbum(id);
  }

  async updateArtistToNull(artistId: string) {
    [...this.data.values()]
      .filter((track) => track.artistId === artistId)
      .forEach((track) => {
        this.data.set(track.id, { ...track, artistId: null });
      });
  }
}
