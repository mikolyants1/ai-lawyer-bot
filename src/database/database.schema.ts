import { paymentsTable } from './tables/payment.table';
import { usersTable } from './tables/user.table';

export const databaseSchema = {
  usersTable,
  paymentsTable,
} as const;
