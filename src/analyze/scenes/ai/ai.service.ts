import { Injectable } from '@nestjs/common';
import { TgContext, User } from 'src/types/global.types';
import { FileUtils } from 'src/utils/files.utils';
import { type Message as TgMessage } from 'telegraf/types';
import { PromptTemplate } from '@langchain/core/prompts';
import { HumanMessage } from '@langchain/core/messages';
import { AInstanceService } from 'src/utils/modules/ai-instance/ai-instance.service';
import { QUESTION_PROMPT } from 'src/analyze/consts/prompt.const';
import { AIAnswer } from 'src/analyze/interfaces/ai-answer.interface';
import { AnalysisState } from 'src/analyze/state/analysis.state';
import { AnalysisNavigation } from 'src/analyze/utils/navigation.utils';
import { TgSessionUtils } from 'src/utils/session.utils';
import { ACTION_DATA } from 'src/analyze/data/action.data';
import { TSection } from 'src/analyze/interfaces/answer-state.interface';
import { StatusState } from 'src/analyze/state/status.state';

@Injectable()
export class AiService {
  constructor(
    private readonly status: StatusState,
    private readonly aInstanceService: AInstanceService,
    private readonly state: AnalysisState,
  ) {}

  async analyzeDocs(ctx: TgContext) {
    const user = TgSessionUtils.getItem<User>('user', ctx)!;
    const status = this.status.getState(user.id);
    if (status.isProcessing) return ctx.reply('Подождите пока закончиться процесс');
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
      console.log(answer);
      const content = JSON.parse(answer.content as string) as AIAnswer;
      //  const content = MOCK_AI_DATA;
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
    console.log(action, state);
    const keyboard = AnalysisNavigation.getForwardKeyboard(action.close);
    ctx.editMessageText(action.render(section), keyboard);
  }

  async closeNavPath(ctx: TgContext) {
    await ctx.answerCbQuery();
    const user = TgSessionUtils.getItem<User>('user', ctx)!;
    const content = this.state.getState(user.id);
    const keyboard = AnalysisNavigation.getNavigationKeyboard();
    await ctx.editMessageText(
      `${content.summary.comment}-${content.summary.reliability}`,
      keyboard,
    );
  }

  clearState(ctx: TgContext) {
    const user = TgSessionUtils.getItem<User>('user', ctx)!;
    this.state.setState(user.id, {});
  }

  private async sendQuestion(text: string) {
    const date = new Date().toISOString();
    const agent = await this.aInstanceService.getAgent();
    const prompt = await PromptTemplate.fromTemplate(QUESTION_PROMPT).format({
      context: text,
      date,
    });
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
