import { Action, Command, Ctx, On, SceneEnter, SceneLeave } from 'nestjs-telegraf';
import { EScene } from 'src/analyze/enums/scene.enum';
import { SceneHandler } from 'src/custom/handlers.custom';
import { type TgContext } from 'src/types/global.types';
import { SceneUtilsService } from 'src/utils/services/scene/scene-utils.service';
import { AiService } from './ai.service';
import { ECommand } from 'src/analyze/enums/command.enum';

@SceneHandler(EScene.AI_ANALYZE)
export class AiScene {
  constructor(
    private readonly sceneService: SceneUtilsService,
    private readonly aiService: AiService,
  ) {}

  @SceneEnter()
  async openScene(@Ctx() ctx: TgContext) {
    this.aiService.clearState(ctx);
    return this.sceneService.sendDescription(ctx);
  }

  @On('document')
  async analyzeDocs(@Ctx() ctx: TgContext) {
    return this.aiService.analyzeDocs(ctx);
  }

  @Action(/open:(.+)/)
  async openNavPath(@Ctx() ctx: TgContext) {
    return this.aiService.openNavPath(ctx);
  }

  @Action(/close:(.+)/)
  async closeNavPath(@Ctx() ctx: TgContext) {
    return this.aiService.closeNavPath(ctx);
  }

  @Command(ECommand.EXIT)
  async exitScene(@Ctx() ctx: TgContext) {
    this.aiService.clearState(ctx);
    return this.sceneService.exitScene(ctx);
  }

  @SceneLeave()
  async sceneLeave(@Ctx() ctx: TgContext) {
    this.aiService.clearState(ctx);
    return this.sceneService.leaveHandler(ctx);
  }
}
