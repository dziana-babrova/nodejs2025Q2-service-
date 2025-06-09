import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ERRORS } from 'src/consts/ERRORS';
import { isUUID } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ValidateTrackPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(id: string): Promise<string> {
    if (!isUUID(id)) {
      throw new BadRequestException(ERRORS.NOT_UUID());
    }

    const existingTrack = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });

    if (!existingTrack) {
      throw new NotFoundException(ERRORS.NOT_FOUND('Track'));
    }

    return id;
  }
}
