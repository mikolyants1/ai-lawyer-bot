import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { telegramConfig } from './configs/telegram.config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TelegrafModule.forRootAsync(telegramConfig()),
    UserModule,
    DatabaseModule,
  ],
})
export class AppModule {}
