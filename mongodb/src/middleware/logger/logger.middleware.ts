import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// nest g middleware middleware/logger // create command for middleware // implement in app root module
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Middleware started....")
    console.log(`LOGGER: [${req.method}] - [${req.originalUrl}]`)
    //  request processing stopped here , only after call next() it will move
    next();
    console.log("Middleware ended....")
  }
}
