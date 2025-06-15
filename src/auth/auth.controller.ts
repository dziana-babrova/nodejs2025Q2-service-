import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { refreshDto } from './dto/refresh.dto';
import { RefreshGuard } from './refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: AuthDto) {
    const { login, password } = data;
    const result = await this.authService.login(login, password);
    return result;
  }

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() data: AuthDto) {
    const { login, password } = data;
    const user = await this.authService.signup(login, password);

    return user;
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  @HttpCode(200)
  async getRefreshToken(@Body() data: refreshDto) {
    return this.authService.refresh(data.refreshToken);
  }
}
