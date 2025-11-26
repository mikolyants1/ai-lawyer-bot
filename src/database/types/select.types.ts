import { paymentsTable } from '../tables/payment.table';
import { usersTable } from '../tables/user.table';

export type UserSelect = typeof usersTable.$inferSelect;

export type PaymentSelect = typeof paymentsTable.$inferSelect;
