import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: any, res: any, next: () => void) {
    const { method, url } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const elapsedTime = Date.now() - startTime;
      this.loggingService.log(
        `${method} ${url} - ${res.statusCode} [${elapsedTime}ms]`,
        'HTTP',
      );
    });

    next();
  }
}
