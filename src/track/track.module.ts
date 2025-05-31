import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { AlbumController } from 'src/album/album.controller';
import { ValidateTrackPipe } from './validate-track.pipe';

@Module({
  imports: [],
  providers: [TrackService, ValidateTrackPipe],
  controllers: [AlbumController],
  exports: [TrackService],
})
export class AlbumModule {}
