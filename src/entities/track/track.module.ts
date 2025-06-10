import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { ValidateTrackPipe } from './validate-track.pipe';
import { TrackController } from './track.controller';
import { FavoritesModule } from 'src/entities/favorites/favorites.module';

@Module({
  imports: [forwardRef(() => FavoritesModule)],
  providers: [TrackService, ValidateTrackPipe],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
