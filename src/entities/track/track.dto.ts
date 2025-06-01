import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class createTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsOptional()
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}
export class updateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsOptional()
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}
