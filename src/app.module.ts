import { Module } from '@nestjs/common';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ArtistModule, AlbumModule, TrackModule, UserModule],
})
export class AppModule {}
