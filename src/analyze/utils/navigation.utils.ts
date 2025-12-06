import { Markup } from 'telegraf';
import { NAVIGATION_DATA } from '../data/action.data';

export class AnalysisNavigation {
  static buildAction(action: string) {
    return {
      action,
      open: `open:${action}`,
      close: `close:${action}`,
    };
  }

  static getNavigationKeyboard() {
    const keyboard = NAVIGATION_DATA.map(c => Markup.button.callback(c.action, c.open));
    return Markup.inlineKeyboard(keyboard);
  }
}
