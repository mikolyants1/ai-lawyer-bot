import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { telegramConfig } from './configs/telegram.config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AnalysisModule } from './analyze/analysis.module';
import { ApiAdminModule } from './api/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    TelegrafModule.forRootAsync(telegramConfig()),
    UserModule,
    AnalysisModule,
    DatabaseModule,
    ApiAdminModule,
  ],
})
export class AppModule {}
