import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { ValidateAlbumPipe } from './validate-album.pipe';

@Module({
  imports: [],
  providers: [AlbumService, ValidateAlbumPipe],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
