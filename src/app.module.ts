import { Module } from '@nestjs/common';
import { AlbumsController } from './album/album.controler';
import { AlbumsService } from './album/album.service';

@Module({
  imports: [],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AppModule {}
