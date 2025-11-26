import { TgContext } from 'src/types/global.types';

export abstract class TgSessionUtils {
  static getItem<T>(key: string, ctx: TgContext): T | null {
    return ctx.session[key] || null;
  }

  static setItem<T>(key: string, value: T, ctx: TgContext) {
    ctx.session[key] = value;
  }

  static delItem(key: string, ctx: TgContext) {
    if (ctx.session[key]) {
      delete ctx.session[key];
    }
  }
}
