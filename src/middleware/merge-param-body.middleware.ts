import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CombineIdBodyMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    req.body.id = req.params.id;
    next();
  }
}
