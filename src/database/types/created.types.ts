import { paymentsTable } from '../tables/payment.table';
import { usersTable } from '../tables/user.table';

export type UserCreated = typeof usersTable.$inferInsert;

export type PaymentCreated = typeof paymentsTable.$inferInsert;
