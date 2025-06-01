import { forwardRef, Module } from '@nestjs/common';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import {
  ValidateDeletionFavoriteAlbumPipe,
  ValidateDeletionFavoriteArtistPipe,
  ValidateDeletionFavoriteTrackPipe,
  ValidateFavoriteAlbumPipe,
  ValidateFavoriteArtistPipe,
  ValidateFavoriteTrackPipe,
} from './validate-favorite.pipe';

@Module({
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
  ],
  providers: [
    FavoritesService,
    ValidateFavoriteTrackPipe,
    ValidateFavoriteAlbumPipe,
    ValidateFavoriteArtistPipe,
    ValidateDeletionFavoriteAlbumPipe,
    ValidateDeletionFavoriteArtistPipe,
    ValidateDeletionFavoriteTrackPipe,
  ],
  controllers: [FavoritesController],
  exports: [FavoritesService],
})
export class FavoritesModule {}
