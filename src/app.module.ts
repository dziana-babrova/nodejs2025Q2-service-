import { Module } from '@nestjs/common';
import { AlbumsController } from './album/album.controller';
import { AlbumsService } from './album/album.service';
import { ArtistsService } from './artist/artist.service';
import { ArtistsController } from './artist/artist.controller';
import { TrackController } from './track/track.controller';
import { TrackService } from './track/track.service';

@Module({
  imports: [],
  controllers: [AlbumsController, ArtistsController, TrackController],
  providers: [AlbumsService, ArtistsService, TrackService],
})
export class AppModule {}
