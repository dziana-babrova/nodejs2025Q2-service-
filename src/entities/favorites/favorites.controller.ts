import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { MESSAGES } from 'src/consts/MESSAGES';
import { Album } from 'src/entities/album/album.interface';
import { Artist } from 'src/entities/artist/artist.interface';
import {
  ValidateDeletionFavoriteAlbumPipe,
  ValidateDeletionFavoriteArtistPipe,
  ValidateDeletionFavoriteTrackPipe,
  ValidateFavoriteAlbumPipe,
  ValidateFavoriteArtistPipe,
  ValidateFavoriteTrackPipe,
} from './validate-favorite.pipe';

@Controller('favs')
export class FavoritesController {
  constructor(private service: FavoritesService) {}

  @Get()
  async findAll() {
    return this.service.getAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  async addTrack(@Param(ValidateFavoriteTrackPipe) id: string) {
    await this.service.addFavorite({ trackId: id, type: 'Track' });
    return MESSAGES.add_track;
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param(ValidateDeletionFavoriteTrackPipe) id: string) {
    await this.service.deleteFavoriteTrack(id);
    return MESSAGES.delete_track;
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbum(@Param(ValidateFavoriteAlbumPipe) id: string) {
    await this.service.addFavorite({ albumId: id, type: 'Album' });
    return MESSAGES.add_album;
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param(ValidateDeletionFavoriteAlbumPipe) id: string) {
    await this.service.deleteFavoriteAlbum(id);
    return MESSAGES.delete_album;
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addArtist(@Param(ValidateFavoriteArtistPipe) id: string) {
    await this.service.addFavorite({ artistId: id, type: 'Artist' });
    return MESSAGES.add_artist;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param(ValidateDeletionFavoriteArtistPipe) id: string) {
    await this.service.deleteFavoriteArtist(id);
    return MESSAGES.delete_artist;
  }
}
