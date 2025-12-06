import { SceneContext } from 'telegraf/scenes';
import { Context } from 'telegraf';
import { usersTable } from 'src/database/tables/user.table';

export type User = typeof usersTable.$inferSelect;

export type TgContext = Context & SceneContext;

export type TEnum<T extends object> = T[keyof T];