import { BotCommand } from 'node_modules/telegraf/typings/core/types/typegram';

export const APP_COMMAND_DATA: BotCommand[] = [
  {
    command: 'analyze',
    description: 'Анализ документа',
  },
  {
    command: 'sub',
    description: 'Информация по подписке',
  },
];

export const PAYMENT_COMMAND_DATA: BotCommand[] = [
  {
    command: 'status',
    description: 'Узнать статус подписки',
  },
  {
    command: 'rate',
    description: 'Узнать тариф',
  },
  {
    command: 'exit',
    description: 'Покинуть режим',
  },
];

export const AI_COMMAND_DATA: BotCommand[] = [
  {
    command: 'exit',
    description: 'Покинуть режим',
  },
];