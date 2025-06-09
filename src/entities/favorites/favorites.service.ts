import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoriteDto } from './favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async addFavorite(item: FavoriteDto) {
    await this.prisma.favorite.create({
      data: { ...item },
    });
  }

  async getAll() {
    const favorites = await this.prisma.favorite.findMany({
      include: {
        Album: true,
        Artist: true,
        Track: true,
      },
    });
    const sortedFavorites = {
      artists: favorites
        .filter((favorite) => favorite.type === 'Artist')
        .map((favorite) => favorite.Artist),
      albums: favorites
        .filter((favorite) => favorite.type === 'Album')
        .map((favorite) => favorite.Album),
      tracks: favorites
        .filter((favorite) => favorite.type === 'Track')
        .map((favorite) => favorite.Track),
    };
    return sortedFavorites;
  }

  async deleteFavoriteArtist(artistId: string) {
    await this.prisma.favorite.delete({
      where: {
        artistId,
      },
    });
  }

  async deleteFavoriteAlbum(albumId: string) {
    await this.prisma.favorite.delete({
      where: {
        albumId,
      },
    });
  }

  async deleteFavoriteTrack(trackId: string) {
    await this.prisma.favorite.delete({
      where: {
        trackId,
      },
    });
  }
}
