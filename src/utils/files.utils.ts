import { extname, join } from 'path';
import { EFileFormat } from 'src/analyze/enums/format.enum';
import { TgContext } from 'src/types/global.types';
import { writeFile } from 'fs/promises';
import { FORMAT_DATA } from 'src/data/format.data';
import { existsSync, mkdirSync } from 'fs';

export class FileUtils {
  private static readonly uploadPath = join(__dirname, '..', '..', '..', 'uploads');

  private static checkDir() {
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath);
    }
  }

  static createPath(path: string) {
    this.checkDir();
    return join(this.uploadPath, path);
  }

  static getFormat(filename: string, mimeType: string) {
    let format: EFileFormat | null = null;
    const ext = extname(filename).toLowerCase();
    //   if (mimeType.startsWith('text/') || ext === '.txt') {
    //  format = EFileFormat.TXT;
    if (mimeType === 'application/pdf' || ext === '.pdf') {
      format = EFileFormat.PDF;
    } else if (mimeType.includes('word') || ext === '.docx') {
      format = EFileFormat.DOCX;
    }
    return format;
  }

  static async downloadFile(ctx: TgContext, fileId: string, file_path: string) {
    const file = await ctx.telegram.getFile(fileId);
    console.log(file, file.file_path);
    const link = await ctx.telegram.getFileLink(fileId);
    const response = await fetch(link);
    const buffer = Buffer.from(await response.arrayBuffer());
    console.log(buffer, response);
    await writeFile(file_path, buffer);
  }

  static async execText(format: EFileFormat, filePath: string) {
    const doc = await FORMAT_DATA[format!](filePath);
    const load = await doc.load();
    return load.map(doc => doc.pageContent).join('\n\n');
  }
}
