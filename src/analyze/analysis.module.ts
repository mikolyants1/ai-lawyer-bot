import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisUpdate } from './analysis.update';
import { SceneUtilsService } from 'src/utils/services/scene/scene-utils.service';
import { SceneOptions } from 'src/utils/providers/scene-options/scene-options.provider';
import { AI_COMMAND_DATA } from 'src/constants/command.const';
import { AI_DESCRIPTION } from 'src/constants/description.const';
import { AiScene } from './scenes/ai/ai.scene';
import { AiService } from './scenes/ai/ai.service';
import { IndexModule } from 'src/utils/modules/indexes/index.module';
import { AInstanceModule } from 'src/utils/modules/ai-instance/ai-instance.module';
import { AuthModule } from 'src/auth/auth.module';
import { AnalysisState } from './state/analysis.state';
import { StatusState } from './state/status.state';

@Module({
  imports: [IndexModule, AInstanceModule, AuthModule],
  providers: [
    AiScene,
    AiService,
    AnalysisService,
    AnalysisUpdate,
    SceneUtilsService,
    AnalysisState,
    StatusState,
    SceneOptions.getProvider({
      commands: AI_COMMAND_DATA,
      description: AI_DESCRIPTION,
    }),
  ],
})
export class AnalysisModule {}
