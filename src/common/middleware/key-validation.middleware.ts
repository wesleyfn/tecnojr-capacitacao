import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeyValidationMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const key = req.query.key;

    if (key !== this.configService.get('ADMIN_KEY')) {
      throw new UnauthorizedException('Chave inválida.');
    }

    next();
  }
}