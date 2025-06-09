import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './artist.interface';
import { createArtistDto, updateArtistDto } from './artist.dto';
import { TrackService } from 'src/entities/track/track.service';
import { AlbumService } from 'src/entities/album/album.service';
import { FavoritesService } from 'src/entities/favorites/favorites.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  private readonly data: Map<string, Artist> = new Map();

  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly prisma: PrismaService,
  ) {}

  async create(data: createArtistDto) {
    return this.prisma.artist.create({
      data,
    });
  }

  async getAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  async get(id: string): Promise<Artist | null> {
    return this.prisma.artist.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: updateArtistDto): Promise<Artist | null> {
    return this.prisma.artist.update({ where: { id }, data });
  }

  async delete(id: string) {
    await this.prisma.artist.delete({
      where: { id },
    });
    // this.trackService.updateArtistToNull(id);
    // this.albumService.updateArtistToNull(id);
    // this.favoritesService.deleteArtist(id);
  }
}
