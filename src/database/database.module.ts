import { Global, Logger, Module, OnModuleInit } from '@nestjs/common';
import { DATABASE } from './consts/database.const';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { databaseSchema } from './database.schema';
import { Database } from './types/database.types';

@Global()
@Module({
  providers: [
    {
      provide: DATABASE,
      useFactory: (config: ConfigService) => {
        const connectionString = config.get<string>('DATABASE_URL');
        const pool = new Pool({ connectionString });
        return drizzle(pool, { schema: databaseSchema }) as Database;
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE],
})
export class DatabaseModule implements OnModuleInit {
  private readonly logger = new Logger(DatabaseModule.name);

  onModuleInit() {
    this.logger.log('database init success');
  }
}
