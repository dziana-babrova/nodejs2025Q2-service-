import { Track } from './track.interface';
import { createTrackDto, updateTrackDto } from './track.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: createTrackDto) {
    return this.prisma.track.create({
      data,
    });
  }

  async getAll(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  async get(id: string): Promise<Track | null> {
    return this.prisma.track.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: updateTrackDto) {
    return this.prisma.track.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.prisma.track.delete({
      where: { id },
    });
  }

  async updateArtistToNull(artistId: string) {
    await this.prisma.track.updateMany({
      where: {
        artistId,
      },
      data: {
        artistId: null,
      },
    });
  }

  async updateAlbumToNull(albumId: string) {
    await this.prisma.track.updateMany({
      where: {
        albumId,
      },
      data: {
        albumId: null,
      },
    });
  }
}
