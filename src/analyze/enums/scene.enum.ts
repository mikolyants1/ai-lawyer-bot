import { TEnum } from 'src/types/global.types';

export const EScene = {
  AI_ANALYZE: 'AI_ANALYZE',
} as const;

export type EScene = TEnum<typeof EScene>;
