import { Markup } from 'telegraf';
import { NAVIGATION_DATA } from '../data/action.data';
import { IRecommendation, IRisk } from '../interfaces/ai-answer.interface';

export class AnalysisNavigation {
  static buildAction(action: string) {
    return {
      action,
      open: `open:${action}`,
      close: `close:${action}`,
    };
  }

  static getNavigationKeyboard() {
    const keyboard = NAVIGATION_DATA.map(c => [Markup.button.callback(c.name, c.open)]);
    console.log(keyboard);
    return Markup.inlineKeyboard(keyboard);
  }

  static getForwardKeyboard(query: string) {
    return Markup.inlineKeyboard([Markup.button.callback('назад', query)]);
  }

  static defRender(data: IRisk[]) {
    let text = '';
    data.forEach((item: IRisk, index: number) => {
      text += `${index + 1}. *${item.text}*\n`;
      text += `> ${item.quote}\n\n`;
    });
    return text;
  }

  static recommendRender(data: IRecommendation[]) {
    let text = '';
    data.forEach((item: any, index: number) => {
      text += `${index + 1}. *Проблема:* ${item.problem}\n`;
      text += `*Предложение:* ${item.suggestion}\n`;
      text += `> ${item.quote}\n\n`;
    });
    return text;
  }

  static missingRender(data: string[]) {
    let text = '';
    data.forEach((item: string, index: number) => {
      text += `${index + 1}. ${item}\n`;
    });
    return text;
  }
}
