import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ERRORS } from 'src/consts/ERRORS';
import { isUUID } from 'class-validator';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { Track } from 'src/track/track.interface';
import { Artist } from 'src/artist/artist.interface';
import { Album } from 'src/album/album.interface';

@Injectable()
export class ValidateFavoriteArtistPipe implements PipeTransform {
  constructor(private readonly service: ArtistService) {}

  async transform({ id }: { id: string }): Promise<Artist> {
    console.log(id, 'id');
    const existingArtist = await this.service.get(id);

    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    if (!existingArtist) {
      throw new NotFoundException(ERRORS.NOT_FOUND('Artist'));
    }
    return existingArtist;
  }
}

@Injectable()
export class ValidateFavoriteAlbumPipe implements PipeTransform {
  constructor(private readonly service: AlbumService) {}

  async transform({ id }: { id: string }): Promise<Album> {
    const existingAlbum = await this.service.get(id);

    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    if (!existingAlbum) {
      throw new NotFoundException(ERRORS.NOT_FOUND('Album'));
    }

    return existingAlbum;
  }
}

@Injectable()
export class ValidateFavoriteTrackPipe implements PipeTransform {
  constructor(private readonly service: TrackService) {}

  async transform({ id }: { id: string }): Promise<Track> {
    const existingTrack = await this.service.get(id);

    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    if (!existingTrack) {
      throw new NotFoundException(ERRORS.NOT_FOUND('Track'));
    }
    return existingTrack;
  }
}
