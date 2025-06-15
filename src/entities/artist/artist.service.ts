import { Injectable } from '@nestjs/common';
import { Artist } from './artist.interface';
import { createArtistDto, updateArtistDto } from './artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: createArtistDto) {
    return this.prisma.artist.create({
      data,
    });
  }

  async getAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  async get(id: string): Promise<Artist | null> {
    return this.prisma.artist.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: updateArtistDto): Promise<Artist | null> {
    return this.prisma.artist.update({ where: { id }, data });
  }

  async delete(id: string) {
    await this.prisma.artist.delete({
      where: { id },
    });
  }
}
