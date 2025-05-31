import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './artist.interface';
import { createArtistDto, updateArtistDto } from './artist.dto';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  private readonly data: Map<string, Artist> = new Map();

  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
  ) {}

  async create(dto: createArtistDto) {
    const id = uuidv4();
    const item: Artist = {
      id,
      ...dto,
    };
    this.data.set(item.id, item);
    return this.get(id);
  }

  async getAll(): Promise<Artist[]> {
    return [...this.data.values()];
  }

  async get(id: string): Promise<Artist | null> {
    return this.data.get(id);
  }

  async update(id: string, updateDto: updateArtistDto): Promise<Artist | null> {
    const updatedItem = {
      id,
      ...updateDto,
    };
    this.data.set(id, updatedItem);
    return this.get(id);
  }

  async delete(id: string) {
    this.data.delete(id);
    this.trackService.updateArtistToNull(id);
    this.albumService.updateArtistToNull(id);
  }
}
