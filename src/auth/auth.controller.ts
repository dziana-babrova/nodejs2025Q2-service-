import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

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
}
