import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiAdminGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(ctx: ExecutionContext): boolean {
    const http = ctx.switchToHttp();
    const req = http.getRequest<Request>();
    console.log(req.body, this.config.get<string>('SAVE'))
    const secret = this.config.get<string>('SAVE');
    const save = req.body['save'];
    return save === secret;
  }
}
