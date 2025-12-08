import { TEnum } from 'src/types/global.types';

export const EFileFormat = {
  PDF: 'PDF',
  TXT: 'TXT',
  DOCX: 'DOCX',
} as const;

export type EFileFormat = TEnum<typeof EFileFormat>;
