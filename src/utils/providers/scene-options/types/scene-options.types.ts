import { BotCommand } from 'node_modules/telegraf/typings/core/types/typegram';

export interface ISceneOptions {
  commands: BotCommand[];
  description: string;
}
