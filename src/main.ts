import path from 'node:path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import YAML from 'yamljs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  const pathToDoc = path.join(__dirname, './../doc/api.yaml');
  const openApiDocument = YAML.load(pathToDoc);
  SwaggerModule.setup('doc', app, openApiDocument);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(port || 4000);
}
bootstrap();
