import { TEnum } from 'src/types/global.types';

export const EModel = {
  OPENAI_TEXT_EMBEDDING_3_SMALL: 'openai/text-embedding-3-small',
  CHAT_GPT_4_MINI: 'gpt-4.1-mini',
  X_AI_GROK_4_FAST: 'x-ai/grok-4.1-fast:free',
} as const;

export type EModel = TEnum<typeof EModel>;
