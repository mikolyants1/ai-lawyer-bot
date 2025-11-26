import { Inject, Injectable } from '@nestjs/common';
import { SCENE_OPTIOMS } from '../../providers/scene-options/consts/scene-options.const';
import { type ISceneOptions } from '../../providers/scene-options/types/scene-options.types';
import { TgContext } from 'src/types/global.types';
import { SceneContext } from 'telegraf/scenes';
import { CommandsUtils } from 'src/utils/commands.utils';

@Injectable()
export class SceneUtilsService {
  constructor(@Inject(SCENE_OPTIOMS) private readonly options: ISceneOptions) {}

  async sendDescription(ctx: SceneContext): Promise<void> {
    await ctx.telegram.setMyCommands(this.options.commands, {
      scope: { type: 'chat', chat_id: ctx?.chat?.id ?? '' },
    });
    await ctx.reply(this.options.description);
  }

  async leaveHandler(ctx: TgContext): Promise<void> {
    await ctx.reply('Выход из режима');
  }

  async exitScene(ctx: TgContext): Promise<void> {
    await CommandsUtils.leaveScene(ctx);
  }
}
