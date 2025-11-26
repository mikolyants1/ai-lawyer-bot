import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { getTgContext } from 'src/utils/context.utils';

@Injectable()
export class SessionUserInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  async intercept(context: ExecutionContext, next: CallHandler<void>): Promise<Observable<void>> {
    const ctx = getTgContext(context);
    await this.authService.saveSessionUser(ctx);
    const user = await this.authService.findUserByTgId(ctx?.from?.id ?? 0);
    console.log('user sess', user);
    return next.handle();
  }
}
