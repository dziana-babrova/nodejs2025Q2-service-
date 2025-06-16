import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ArtistModule } from './entities/artist/artist.module';
import { AlbumModule } from './entities/album/album.module';
import { TrackModule } from './entities/track/track.module';
import { UserModule } from './entities/user/user.module';
import { FavoritesModule } from './entities/favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LoggingService } from './logging/logging.service';
import { LoggingMiddleware } from './logging/logging.middleware';

@Module({
  imports: [
    ArtistModule,
    AlbumModule,
    TrackModule,
    UserModule,
    FavoritesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
  ],
  providers: [LoggingService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
