import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { ValidateTrackPipe } from './validate-track.pipe';
import { TrackController } from './track.controller';

@Module({
  imports: [],
  providers: [TrackService, ValidateTrackPipe],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
