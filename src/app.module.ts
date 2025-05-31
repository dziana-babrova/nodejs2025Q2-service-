import { Module } from '@nestjs/common';
import { TrackController } from './track/track.controller';
import { TrackService } from './track/track.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class AppModule {}
