import { TEnum } from 'src/types/global.types';

export const ECommand = {
  ANALYZE: 'analyze',
  EXIT: 'exit',
} as const;

export type ECommand = TEnum<typeof ECommand>;
