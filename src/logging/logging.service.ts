import { Injectable, Logger } from '@nestjs/common';
import path from 'node:path';
import fs from 'fs';
import { rename, stat } from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggingService {
  private readonly logger = new Logger('Home Library');
  private logFilePath: string;
  private errorLogFilePath: string;
  private maxFileSize: number;
  private logLevel: number;

  constructor(private readonly configService: ConfigService) {
    this.maxFileSize =
      Number(this.configService.get('MAX_FILE_SIZE')) || 5 * 1024 * 1024;
    this.logLevel = Number(this.configService.get('LOG_LEVEL'));
    this.logFilePath = path.join(process.cwd(), 'logs', 'application.log');
    this.errorLogFilePath = path.join(process.cwd(), 'logs', 'errors.log');
    fs.mkdir(path.dirname(this.logFilePath), () => {});
  }

  private async rotateLogFile(file: string) {
    const date = new Date().toISOString().slice(0, 10);
    const rotatedFile = `${file}.${date}`;
    await rename(file, rotatedFile);
    this.logger.log(`Log file rotated: ${rotatedFile}`);
  }

  private async writeToFile(message: string, path: string) {
    try {
      if (fs.existsSync(path)) {
        const fileStats = await stat(this.logFilePath);
        if (fileStats.size >= this.maxFileSize) {
          await this.rotateLogFile(path);
        }
      }
      fs.appendFile(path, `${message}\n`, async (err) => {
        if (err) {
          await this.warn('Failed to write to log file', err.stack);
        }
      });
    } catch {
      await this.warn('Failed to rotate a log file');
    }
  }

  private formatMessage(level: string, message: string, context?: string) {
    const timestamp = new Date().toISOString();
    const contextPart = context ? `[${context}]` : '';
    return `${timestamp} [${level.toUpperCase()}] ${contextPart} ${message}`;
  }

  async log(message: string, context?: any) {
    if (this.logLevel > 3) return;
    this.logger.log(this.formatMessage('log', message, context));
    await this.writeToFile(
      this.formatMessage('log', message, context),
      this.logFilePath,
    );
  }

  async warn(message: string, context?: string) {
    if (this.logLevel > 4) return;

    this.logger.warn(this.formatMessage('warn', message, context));
    await this.writeToFile(
      this.formatMessage('warn', message, context),
      this.logFilePath,
    );
  }

  async error(message: string, context?: string) {
    this.logger.error(this.formatMessage('error', message, context));
    await this.writeToFile(
      this.formatMessage('error', message, context),
      this.logFilePath,
    );
    await this.writeToFile(
      this.formatMessage('error', message, context),
      this.errorLogFilePath,
    );
  }

  async debug(message: string, context?: string) {
    if (this.logLevel > 2) return;
    this.logger.debug(this.formatMessage('debug', message, context));
    await this.writeToFile(
      this.formatMessage('debug', message, context),
      this.logFilePath,
    );
  }

  async verbose(message: string, context?: string) {
    if (this.logLevel > 1) return;
    this.logger.verbose(this.formatMessage('verbose', message, context));
    await this.writeToFile(
      this.formatMessage('verbose', message, context),
      this.logFilePath,
    );
  }
}
