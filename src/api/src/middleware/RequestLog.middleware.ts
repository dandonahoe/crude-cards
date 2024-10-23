
import { Request, Response, NextFunction } from 'express';

export function RequestLogMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(`Request123123...`);

  next();
};
