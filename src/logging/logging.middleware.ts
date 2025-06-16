import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  async use(req: Request, res: Response, next: () => void) {
    const { method, baseUrl, query, body } = req;
    const startTime = Date.now();

    await this.loggingService.log('Request');
    await this.loggingService.log(
      `${method} ${baseUrl} Query Parameters: ${JSON.stringify(query)} Request Body: ${JSON.stringify(body)}`,
    );

    res.on('finish', async () => {
      const elapsedTime = Date.now() - startTime;
      await this.loggingService.log('Response');
      await this.loggingService.log(
        `${method} ${baseUrl} - ${res.statusCode} [${elapsedTime}ms]`,
        'HTTP',
      );
    });

    next();
  }
}
