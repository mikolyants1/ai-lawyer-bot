import { APP_COMMAND_DATA } from 'src/constants/command.const';
import { TgContext } from 'src/types/global.types';

export abstract class CommandsUtils {
  static async leaveScene(ctx: TgContext) {
    await ctx.telegram.setMyCommands(APP_COMMAND_DATA, {
      scope: { type: 'chat', chat_id: ctx?.chat?.id ?? '' },
    });
    await ctx.scene.leave();
  }
}
