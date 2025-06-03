import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ERRORS } from 'src/consts/ERRORS';
import { isUUID } from 'class-validator';
import { TrackService } from 'src/entities/track/track.service';
import { ArtistService } from 'src/entities/artist/artist.service';
import { AlbumService } from 'src/entities/album/album.service';
import { Track } from 'src/entities/track/track.interface';
import { Artist } from 'src/entities/artist/artist.interface';
import { Album } from 'src/entities/album/album.interface';
import { FavoritesService } from './favorites.service';

@Injectable()
export class ValidateFavoriteArtistPipe implements PipeTransform {
  constructor(private readonly service: ArtistService) {}

  async transform({ id }: { id: string }): Promise<Artist> {
    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    const existingArtist = await this.service.get(id);

    if (!existingArtist) {
      throw new UnprocessableEntityException(
        ERRORS.UNPRROCESSABLE_ENTITY('Artist'),
      );
    }
    return existingArtist;
  }
}

@Injectable()
export class ValidateFavoriteAlbumPipe implements PipeTransform {
  constructor(private readonly service: AlbumService) {}

  async transform({ id }: { id: string }): Promise<Album> {
    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    const existingAlbum = await this.service.get(id);

    if (!existingAlbum) {
      throw new UnprocessableEntityException(
        ERRORS.UNPRROCESSABLE_ENTITY('Album'),
      );
    }

    return existingAlbum;
  }
}

@Injectable()
export class ValidateFavoriteTrackPipe implements PipeTransform {
  constructor(private readonly service: TrackService) {}

  async transform({ id }: { id: string }): Promise<Track> {
    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    const existingTrack = await this.service.get(id);

    if (!existingTrack) {
      throw new UnprocessableEntityException(
        ERRORS.UNPRROCESSABLE_ENTITY('Track'),
      );
    }
    return existingTrack;
  }
}

@Injectable()
export class ValidateDeletionFavoriteAlbumPipe implements PipeTransform {
  constructor(private readonly service: FavoritesService) {}

  async transform({ id }: { id: string }) {
    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    const item = this.service.findAlbum(id);

    if (!item) {
      throw new NotFoundException(ERRORS.NOT_FOUND('Album'));
    }
    return id;
  }
}

@Injectable()
export class ValidateDeletionFavoriteTrackPipe implements PipeTransform {
  constructor(private readonly service: FavoritesService) {}

  async transform({ id }: { id: string }) {
    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    const item = this.service.findTrack(id);

    if (!item) {
      throw new NotFoundException(ERRORS.NOT_FOUND('Track'));
    }
    return id;
  }
}

@Injectable()
export class ValidateDeletionFavoriteArtistPipe implements PipeTransform {
  constructor(private readonly service: FavoritesService) {}

  async transform({ id }: { id: string }) {
    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    const item = this.service.findArtist(id);
    if (!item) {
      throw new NotFoundException(ERRORS.NOT_FOUND('Artist'));
    }
    return id;
  }
}
