import { pgTable, uuid, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './user.table';
import { relations } from 'drizzle-orm';

export const paymentStatus = pgEnum('e_payment_status', ['PENDING', 'COMPLETED', 'FAILED']);

export const paymentsTable = pgTable('payments', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  status: paymentStatus('status').notNull().default('COMPLETED'),
  updated_at: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
  user_id: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});

export const paymentRelations = relations(paymentsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [paymentsTable.user_id],
    references: [usersTable.id],
  }),
}));
