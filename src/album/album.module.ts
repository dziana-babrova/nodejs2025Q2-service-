import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { ValidateAlbumPipe } from './validate-album.pipe';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [forwardRef(() => TrackModule)],
  providers: [AlbumService, ValidateAlbumPipe],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
