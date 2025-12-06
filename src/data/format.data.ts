import { EFileFormat } from 'src/analyze/enums/format.enum';

export const FORMAT_DATA = {
  [EFileFormat.PDF]: async (filePath: string) => {
    const { PDFLoader } = await import('@langchain/community/document_loaders/fs/pdf');
    return new PDFLoader(filePath, { splitPages: true });
  },
  [EFileFormat.DOCX]: async (filePath: string) => {
    const { DocxLoader } = await import('@langchain/community/document_loaders/fs/docx');
    return new DocxLoader(filePath);
  },
} as const;
