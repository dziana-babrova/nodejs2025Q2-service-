import { Module } from '@nestjs/common';
import { AlbumsController } from './album/album.controller';
import { AlbumsService } from './album/album.service';
import { TrackController } from './track/track.controller';
import { TrackService } from './track/track.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [UserModule, ArtistModule],
  controllers: [AlbumsController, TrackController],
  providers: [AlbumsService, TrackService],
})
export class AppModule {}
