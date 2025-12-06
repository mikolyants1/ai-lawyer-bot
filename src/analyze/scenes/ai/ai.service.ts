import { Injectable } from '@nestjs/common';
import { TgContext, User } from 'src/types/global.types';
import { FileUtils } from 'src/utils/files.utils';
import { type Message as TgMessage } from 'telegraf/types';
import { PromptTemplate } from '@langchain/core/prompts';
import { HumanMessage } from 'langchain';
import { AInstanceService } from 'src/utils/modules/ai-instance/ai-instance.service';
import { QUESTION_PROMPT } from 'src/analyze/consts/prompt.const';
import { AIAnswer } from 'src/analyze/interfaces/ai-answer.interface';
import { AnalysisState } from 'src/analyze/state/state.service';
import { AuthService } from 'src/auth/auth.service';
import { AnalysisNavigation } from 'src/analyze/utils/navigation.utils';
import { TgSessionUtils } from 'src/utils/session.utils';
import { ACTION_DATA } from 'src/analyze/data/action.data';
import { TSection } from 'src/analyze/interfaces/state.interface';

@Injectable()
export class AiService {
  constructor(
    private readonly authService: AuthService,
    private readonly aInstanceService: AInstanceService,
    private readonly state: AnalysisState,
  ) {}

  async analyzeDocs(ctx: TgContext) {
    try {
      const message = ctx.message?.['document'] as TgMessage.DocumentMessage['document'];
      const { fileId, fileName, mimeType } = this.buildFile(message);
      const format = FileUtils.getFormat(fileName, mimeType);
      if (!format) return ctx.reply('Файл такого формата не поддерживается');
      const filePath = FileUtils.createPath(fileId);
      await FileUtils.downloadFile(ctx, fileId, filePath);
      const text = await FileUtils.execText(format, filePath);
      const result = await this.sendQuestion(text);
      const answer = result.messages.at(-1);
      if (!answer) return ctx.reply('Ошибка при получении ответа');
      const content = JSON.parse(answer.content as string) as AIAnswer;
      const user = TgSessionUtils.getItem<User>('user', ctx)!;
      this.state.setState(user.id, content);
      const keyboard = AnalysisNavigation.getNavigationKeyboard();
      await ctx.reply(`${content.summary.comment}-${content.summary.reliability}`, keyboard);
      console.log('content: ', content);
      await ctx.reply('success');
    } catch (e) {
      console.log(e);
      await ctx.reply('Ошибка во время анализа');
    }
  }

  async openNavPath(ctx: TgContext) {
    const data = ctx?.callbackQuery?.['data'] as string;
    if (!data) return ctx.reply('Ошибка во время навигации');
    await ctx.answerCbQuery();
    const sectionKey = data.split(':')[1];
    const user = TgSessionUtils.getItem<User>('user', ctx)!;
    const state = this.state.getState(user.id);
    const action = ACTION_DATA[sectionKey] as TSection;
    const section = state[sectionKey];
    ctx.editMessageText();
  }

  async closeNavPath(ctx: TgContext) {}

  private async sendQuestion(text: string) {
    const agent = await this.aInstanceService.getAgent();
    const prompt = await PromptTemplate.fromTemplate(QUESTION_PROMPT).format({ context: text });
    return agent.invoke({ messages: [new HumanMessage(prompt)] });
  }

  private buildFile(message: TgMessage.DocumentMessage['document']) {
    const fileName = message.file_name ?? 'unkonwn';
    return {
      fileId: message.file_id,
      fileName: `${fileName}_${Date.now()}`,
      mimeType: message.mime_type ?? 'unknown',
    };
  }
}
