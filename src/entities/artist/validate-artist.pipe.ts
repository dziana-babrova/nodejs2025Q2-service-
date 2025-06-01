import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ERRORS } from 'src/consts/ERRORS';
import { isUUID } from 'class-validator';

@Injectable()
export class ValidateArtistPipe implements PipeTransform {
  constructor(private readonly service: ArtistService) {}

  async transform(id: string): Promise<string> {
    const existingUser = await this.service.get(id);

    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    if (!existingUser) {
      throw new NotFoundException(ERRORS.NOT_FOUND('Artist'));
    }

    return id;
  }
}
