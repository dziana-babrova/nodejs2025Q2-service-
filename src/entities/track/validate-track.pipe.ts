import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ERRORS } from 'src/consts/ERRORS';
import { isUUID } from 'class-validator';
import { TrackService } from './track.service';

@Injectable()
export class ValidateTrackPipe implements PipeTransform {
  constructor(private readonly service: TrackService) {}

  async transform(id: string): Promise<string> {
    const existingTrack = await this.service.get(id);

    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    if (!existingTrack) {
      throw new NotFoundException(ERRORS.NOT_FOUND('Track'));
    }

    return id;
  }
}
