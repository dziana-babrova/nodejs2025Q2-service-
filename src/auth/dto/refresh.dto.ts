import { IsNotEmpty, IsString } from 'class-validator';

export class refreshDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
