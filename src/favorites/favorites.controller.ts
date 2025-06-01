import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { MESSAGES } from 'src/consts/MESSAGES';
import { Track } from 'src/track/track.interface';
import { Album } from 'src/album/album.interface';
import { Artist } from 'src/artist/artist.interface';
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
  async addTrack(@Param(ValidateFavoriteTrackPipe) track: Track) {
    await this.service.addTrack(track);
    return MESSAGES.add_track;
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param(ValidateDeletionFavoriteTrackPipe) id: string) {
    await this.service.deleteTrack(id);
    return MESSAGES.delete_track;
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbum(@Param(ValidateFavoriteAlbumPipe) album: Album) {
    await this.service.addAlbum(album);
    return MESSAGES.add_album;
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param(ValidateDeletionFavoriteAlbumPipe) id: string) {
    await this.service.deleteAlbum(id);
    return MESSAGES.delete_album;
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addArtist(@Param(ValidateFavoriteArtistPipe) artist: Artist) {
    await this.service.addArtist(artist);
    return MESSAGES.add_artist;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param(ValidateDeletionFavoriteArtistPipe) id: string) {
    await this.service.deleteArtist(id);
    return MESSAGES.delete_artist;
  }
}
