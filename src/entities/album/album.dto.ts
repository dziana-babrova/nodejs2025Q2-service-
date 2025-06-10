import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class createAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsOptional()
  artistId: string | null;
}

export class updateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsOptional()
  artistId: string | null;
}
