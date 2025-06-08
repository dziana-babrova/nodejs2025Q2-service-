import { Module } from '@nestjs/common';
import { ArtistModule } from './entities/artist/artist.module';
import { AlbumModule } from './entities/album/album.module';
import { TrackModule } from './entities/track/track.module';
import { UserModule } from './entities/user/user.module';
import { FavoritesModule } from './entities/favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ArtistModule,
    AlbumModule,
    TrackModule,
    UserModule,
    FavoritesModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
