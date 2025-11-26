import { Injectable } from '@nestjs/common';
import { AuthRepository } from './repository/auth.repository';
import { ICreateUserArgs } from './types/auth.types';
import { UserSelect } from 'src/database/types/select.types';
import { GlobalStateService } from '../utils/modules/global-state/global-state.service';
import { TgContext } from 'src/types/global.types';
import { TgSessionUtils } from 'src/utils/session.utils';
import { InferEnum } from 'drizzle-orm';
import { paymentStatus } from 'src/database/tables/payment.table';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly globalStateService: GlobalStateService,
  ) {}

  async getOrCreateUser({ tg_id, username }: ICreateUserArgs): Promise<UserSelect> {
    const user = await this.repository.findUserByTgId(tg_id);
    if (user) return user;
    return this.repository.createUser({ tg_id, username });
  }

  async findUserByTgId(id: number): Promise<UserSelect> {
    return this.repository.findUserByTgId(id);
  }

  async updatePaymentStatus(id: string, status: InferEnum<typeof paymentStatus>) {
    return this.repository.updatePaymentStatus(id, status);
  }

  async saveSessionUser(ctx: TgContext): Promise<void> {
    const sessionUser = TgSessionUtils.getItem<UserSelect>('user', ctx);
    const state = this.globalStateService.getState(sessionUser ? sessionUser.id : '');
    if (!sessionUser || state.isUpdating) {
      const user = await this.getOrCreateUser({
        tg_id: ctx?.from?.id ?? 0,
        username: ctx?.from?.username ?? '',
      });
      TgSessionUtils.setItem<UserSelect>('user', user, ctx);
      this.globalStateService.setState(user.id, { isUpdating: false });
    }
  }
}
