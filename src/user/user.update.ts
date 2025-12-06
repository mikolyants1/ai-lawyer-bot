import { UpdateHandler } from 'src/custom/handlers.custom';
import { UserService } from './user.service';
import { Ctx, Help, Start } from 'nestjs-telegraf';
import { type TgContext } from 'src/types/global.types';

@UpdateHandler()
export class UserUpdate {
  constructor(private readonly service: UserService) {}

  @Start()
  async start(@Ctx() ctx: TgContext) {
    return this.service.start(ctx);
  }

  @Help()
  async help(@Ctx() ctx: TgContext) {
    return this.service.help(ctx);
  }
}
