import { forwardRef, Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { ValidateAlbumPipe } from './validate-album.pipe';
import { TrackModule } from 'src/entities/track/track.module';
import { FavoritesModule } from 'src/entities/favorites/favorites.module';

@Module({
  imports: [forwardRef(() => TrackModule), forwardRef(() => FavoritesModule)],
  providers: [AlbumService, ValidateAlbumPipe],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
