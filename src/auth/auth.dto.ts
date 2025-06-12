import { IsNotEmpty } from 'class-validator';

export class authDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
