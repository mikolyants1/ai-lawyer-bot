import {
  pgTable,
  uuid,
  timestamp,
  pgEnum,
  integer,
  check,
  index,
  varchar,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { paymentsTable } from './payment.table';

export const rateEnum = pgEnum('users_rate', ['FREE', 'PREMIUM']);

export const usersTable = pgTable(
  'users',
  {
    id: uuid('id').notNull().primaryKey().defaultRandom(),
    tg_id: integer('tg_id').unique().notNull(),
    username: varchar('username', { length: 255 }).notNull(),
    rate: rateEnum('rate').default('FREE').notNull(),
    available_requests: integer('available_requests').notNull().default(20),
    created_at: timestamp('created_at').notNull().defaultNow(),
  },
  table => [
    check('check_requests', sql`${table.available_requests} > -1`),
    index('tg_id_index').on(table.tg_id),
    index('rate_index').on(table.rate),
  ],
);

export const userRelations = relations(usersTable, ({ one }) => ({
  payment: one(paymentsTable),
}));
