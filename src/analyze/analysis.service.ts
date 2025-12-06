import { Injectable } from '@nestjs/common';
import { type TgContext } from 'src/types/global.types';
import { EScene } from './enums/scene.enum';

@Injectable()
export class AnalysisService {
  async openAiScene(ctx: TgContext) {
    await ctx.scene.enter(EScene.AI_ANALYZE);
  }
}
