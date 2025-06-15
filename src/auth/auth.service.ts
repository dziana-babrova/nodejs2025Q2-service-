import { ForbiddenException, Injectable } from '@nestjs/common';
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
    const userValidated = await this.validateUser(login, password);

    if (!userValidated) {
      throw new ForbiddenException(ERRORS.INVALID_CREDENTIALS());
    }

    return this.generateTokens(userValidated.id, userValidated.login);
  }

  async signup(login: string, password: string) {
    const existingUser = await this.userService.getByLogin(login);
    if (existingUser) return existingUser;

    return this.userService.create({ login, password });
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      });
      return this.generateTokens(payload.userId, payload.login);
    } catch {
      throw new ForbiddenException(ERRORS.INVALID_REFRESH_TOKEN());
    }
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new Error('Invalid token');
    }
  }

  async generateTokens(userId: string, login: string) {
    const payload = { userId, login };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
      expiresIn: this.configService.get<string>('TOKEN_EXPIRE_TIME'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      expiresIn: this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
    });

    return { accessToken, refreshToken };
  }
}
