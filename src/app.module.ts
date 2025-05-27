import { Module } from '@nestjs/common';
import { AlbumsController } from './album/album.controller';
import { AlbumsService } from './album/album.service';
import { ArtistsService } from './artist/artist.service';
import { ArtistsController } from './artist/artist.controller';

@Module({
  imports: [],
  controllers: [AlbumsController, ArtistsController],
  providers: [AlbumsService, ArtistsService],
})
export class AppModule {}
