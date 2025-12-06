import { Module } from '@nestjs/common';
import { AInstanceService } from './ai-instance.service';
import { IndexModule } from '../indexes/index.module';
import { PineconeTool } from './tools/pinecone.tool';

@Module({
  imports: [IndexModule],
  providers: [AInstanceService, PineconeTool],
  exports: [AInstanceService],
})
export class AInstanceModule {}
