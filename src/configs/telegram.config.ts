import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModuleAsyncOptions } from 'nestjs-telegraf';
import { AnalyzeModule } from 'src/analyze/analysis.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { session } from 'telegraf';

export const telegramConfig = (): TelegrafModuleAsyncOptions => ({
  imports: [ConfigModule, AuthModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    token: config.get<string>('BOT_TOKEN')!,
    include: [UserModule, AnalyzeModule],
    middlewares: [session({ defaultSession: () => ({}) })],
  }),
});
