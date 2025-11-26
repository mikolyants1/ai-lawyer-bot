import { Inject, Injectable } from '@nestjs/common';
import { type ICreateUserArgs } from '../types/auth.types';
import { type Database } from 'src/database/types/database.types';
import { DATABASE } from 'src/database/consts/database.const';
import { usersTable } from 'src/database/tables/user.table';
import { UserSelect } from 'src/database/types/select.types';
import { eq, InferEnum } from 'drizzle-orm';
import { paymentsTable, paymentStatus } from 'src/database/tables/payment.table';

@Injectable()
export class AuthRepository {
  constructor(@Inject(DATABASE) private readonly db: Database) {}

  async createUser({ tg_id, username }: ICreateUserArgs) {
    return this.db
      .insert(usersTable)
      .values({
        tg_id,
        username,
      })
      .returning()
      .then(([user]) => user);
  }

  async findUserByTgId(id: number): Promise<UserSelect> {
    return this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.tg_id, id))
      .then(([user]) => user);
  }

  async updatePaymentStatus(id: string, status: InferEnum<typeof paymentStatus>) {
    return this.db.update(paymentsTable).set({ status }).where(eq(paymentsTable.user_id, id));
  }
}
