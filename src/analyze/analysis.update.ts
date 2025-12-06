import { UpdateHandler } from 'src/custom/handlers.custom';
import { AnalysisService } from './analysis.service';
import { Command, Ctx } from 'nestjs-telegraf';
import { type TgContext } from 'src/types/global.types';
import { ECommand } from './enums/command.enum';

@UpdateHandler()
export class AnalysisUpdate {
  constructor(private readonly service: AnalysisService) {}

  @Command(ECommand.ANALYZE)
  async openAiScene(@Ctx() ctx: TgContext) {
    return this.service.openAiScene(ctx);
  }
}
