import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ValidateArtistExistsPipe } from './validate-artist.pipe';

@Module({
  imports: [],
  providers: [ArtistService, ValidateArtistExistsPipe],
  controllers: [ArtistController],
  exports: [ArtistService],
})
export class ArtistModule {}
