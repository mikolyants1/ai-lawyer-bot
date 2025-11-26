import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { databaseSchema } from '../database.schema';

export type Database = NodePgDatabase<typeof databaseSchema>;
