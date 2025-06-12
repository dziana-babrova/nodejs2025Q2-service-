import {
  Controller,
  Post,
  Body,
  Get,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: authDto) {
    const { login, password } = data;
    console.log(login, password);
    return this.authService.login(login, password);
  }

  @Get('verify')
  async verify(@Headers('Authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Missing token');
    }
    return this.authService.verifyToken(token);
  }
}
