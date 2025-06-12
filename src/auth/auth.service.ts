import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/entities/user/user.service';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { UserEntity } from 'src/entities/user/user.dto';
import { ERRORS } from 'src/consts/ERRORS';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.userService.getByLogin(login);
    if (user && (await bcrypt.compare(password, user.password))) {
      return plainToClass(UserEntity, user);
    }
    return null;
  }

  async login(login: string, password: string) {
    const userVAlidated = await this.validateUser(login, password);

    if (!userVAlidated) {
      throw new UnauthorizedException(ERRORS.INVALID_CREDENTIALS());
    }

    const payload = { username: userVAlidated.login, sub: userVAlidated.id };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new Error('Invalid token');
    }
  }
}
