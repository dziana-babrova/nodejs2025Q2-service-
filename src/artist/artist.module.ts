import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ValidateArtistPipe } from './validate-artist.pipe';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [forwardRef(() => TrackModule), forwardRef(() => AlbumModule)],
  providers: [ArtistService, ValidateArtistPipe],
  controllers: [ArtistController],
})
export class ArtistModule {}
