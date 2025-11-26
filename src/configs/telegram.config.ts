import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModuleAsyncOptions } from 'nestjs-telegraf';
import { UserUpdate } from 'src/user/user.update';
import { session } from 'telegraf';

export const telegramConfig = (): TelegrafModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    token: config.get<string>('BOT_TOKEN')!,
    include: [UserUpdate],
    middlewares: [session({ defaultSession: () => ({}) })],
  }),
});
