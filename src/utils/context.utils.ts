import { ExecutionContext } from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';
import { TgContext } from 'src/types/global.types';

export const getTgContext = (ctx: ExecutionContext) => {
  return TelegrafExecutionContext.create(ctx).getContext<TgContext>();
};
