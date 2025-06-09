import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Album } from './album.interface';
import { createAlbumDto, updateAlbumDto } from './album.dto';
import { TrackService } from 'src/entities/track/track.service';
import { FavoritesService } from 'src/entities/favorites/favorites.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  private readonly data: Map<string, Album> = new Map();

  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly prisma: PrismaService,
  ) {}

  async create(data: createAlbumDto) {
    return this.prisma.album.create({
      data,
    });
  }

  async getAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async get(id: string): Promise<Album | null> {
    return this.prisma.album.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: updateAlbumDto): Promise<Album | null> {
    return this.prisma.album.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.prisma.album.delete({
      where: { id },
    });
    // this.trackService.updateAlbumToNull(id);
    // this.favoritesService.deleteAlbum(id);
  }

  // async updateArtistToNull(artistId: string) {
  //   await this.prisma.track.updateMany({
  //     where: {
  //       artistId,
  //     },
  //     data: {
  //       artistId: null,
  //     },
  //   });
  // }
}
