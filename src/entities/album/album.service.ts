import { Injectable } from '@nestjs/common';
import { Album } from './album.interface';
import { createAlbumDto, updateAlbumDto } from './album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: createAlbumDto) {
    return this.prisma.album.create({
      data,
    });
  }

  async getAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async get(id: string): Promise<Album | null> {
    return this.prisma.album.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: updateAlbumDto): Promise<Album | null> {
    return this.prisma.album.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.prisma.album.delete({
      where: { id },
    });
  }
}
