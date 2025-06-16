import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './logging/exception.filter';
import { LoggingService } from './logging/logging.service';
import { SwaggerModule } from '@nestjs/swagger';
import YAML from 'yamljs';
import path from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const loggingService = app.get(LoggingService);

  const pathToDoc = path.join(__dirname, './../doc/api.yaml');
  const openApiDocument = YAML.load(pathToDoc);
  SwaggerModule.setup('doc', app, openApiDocument);

  app.useGlobalFilters(new HttpExceptionFilter(loggingService));

  process.on('uncaughtException', (err: Error) => {
    loggingService.error(`Uncaught Exception: ${JSON.stringify(err)}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (err: Error) => {
    loggingService.error(`Unhandled Rejection ${JSON.stringify(err)}`);
  });

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
