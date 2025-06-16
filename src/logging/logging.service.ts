import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
  private readonly logger = new Logger('Home Library');

  private formatMessage(level: string, message: string, context?: string) {
    const timestamp = new Date().toISOString();
    const contextPart = context ? `[${context}]` : '';
    return `${timestamp} [${level.toUpperCase()}] ${contextPart} ${message}`;
  }

  log(message: string, context?: string) {
    this.logger.log(this.formatMessage('log', message, context));
  }

  warn(message: string, context?: string) {
    this.logger.warn(this.formatMessage('warn', message, context));
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(this.formatMessage('error', message, context));
  }

  debug(message: string, context?: string) {
    this.logger.debug(this.formatMessage('debug', message, context));
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(this.formatMessage('verbose', message, context));
  }
}
