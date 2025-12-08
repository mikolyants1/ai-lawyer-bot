import { TEnum } from 'src/types/global.types';

export const EModel = {
  OPENAI_TEXT_EMBEDDING_3_SMALL: 'openai/text-embedding-3-small',
  CHAT_GPT_4_MINI: 'gpt-4.1-mini',
  DEEPSEEK_CHEMERA: 'tngtech/deepseek-r1t2-chimera:free',
  QWEN_EMBEDDING: 'qwen/qwen3-embedding-8b',
  CHAT_GPT_OSS: 'openai/gpt-oss-20b:free',
  X_AI_GROK_4_FAST: 'x-ai/grok-4.1-fast:free',
} as const;

export type EModel = TEnum<typeof EModel>;
