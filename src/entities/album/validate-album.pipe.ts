import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ERRORS } from 'src/consts/ERRORS';
import { isUUID } from 'class-validator';
import { AlbumService } from './album.service';

@Injectable()
export class ValidateAlbumPipe implements PipeTransform {
  constructor(private readonly service: AlbumService) {}

  async transform(id: string): Promise<string> {
    const existingAlbum = await this.service.get(id);

    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    if (!existingAlbum) {
      throw new NotFoundException(ERRORS.NOT_FOUND('Album'));
    }

    return id;
  }
}
