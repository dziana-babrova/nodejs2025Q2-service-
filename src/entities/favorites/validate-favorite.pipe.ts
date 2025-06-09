import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ERRORS } from 'src/consts/ERRORS';
import { isUUID } from 'class-validator';
import { FavoritesService } from './favorites.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Album, Artist, Track } from '@prisma/client';

@Injectable()
export class ValidateFavoriteArtistPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform({ id }: { id: string }): Promise<string> {
    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    const existingArtist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (!existingArtist) {
      throw new UnprocessableEntityException(
        ERRORS.UNPRROCESSABLE_ENTITY('Artist'),
      );
    }
    return id;
  }
}

@Injectable()
export class ValidateFavoriteAlbumPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform({ id }: { id: string }): Promise<string> {
    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    const existingAlbum = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    if (!existingAlbum) {
      throw new UnprocessableEntityException(
        ERRORS.UNPRROCESSABLE_ENTITY('Album'),
      );
    }

    return id;
  }
}

@Injectable()
export class ValidateFavoriteTrackPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform({ id }: { id: string }): Promise<string> {
    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    const existingTrack = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });

    if (!existingTrack) {
      throw new UnprocessableEntityException(
        ERRORS.UNPRROCESSABLE_ENTITY('Track'),
      );
    }
    return id;
  }
}

@Injectable()
export class ValidateDeletionFavoriteAlbumPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform({ id }: { id: string }) {
    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    const item = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException(ERRORS.NOT_FOUND('Album'));
    }

    return id;
  }
}

@Injectable()
export class ValidateDeletionFavoriteTrackPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform({ id }: { id: string }) {
    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    const item = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException(ERRORS.NOT_FOUND('Track'));
    }
    return id;
  }
}

@Injectable()
export class ValidateDeletionFavoriteArtistPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform({ id }: { id: string }) {
    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    const item = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (!item) {
      throw new NotFoundException(ERRORS.NOT_FOUND('Artist'));
    }
    return id;
  }
}
