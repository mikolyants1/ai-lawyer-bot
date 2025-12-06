import { Injectable } from '@nestjs/common';
import { APP_COMMAND_DATA } from 'src/constants/command.const';
import { APP_DESCRIPTION } from 'src/constants/description.const';
import { TgContext } from 'src/types/global.types';

@Injectable()
export class UserService {
  async start(ctx: TgContext) {
    await ctx.reply(APP_DESCRIPTION);
  }

  async help(ctx: TgContext) {
    const commands = APP_COMMAND_DATA.map(c => `/${c.command} - ${c.description}\n`).join('');
    await ctx.reply(commands);
  }
}
