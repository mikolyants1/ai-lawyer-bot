import { Injectable } from '@nestjs/common';
import { DynamicStructuredTool, tool } from 'langchain';

import { z } from 'zod';
import { IndexService } from '../../indexes/index.service';
import { PineconeStore } from '@langchain/pinecone';

@Injectable()
export class PineconeTool {
  private toolInstance: DynamicStructuredTool | null = null;

  constructor(private readonly indexService: IndexService) {}

  async getTool(store: PineconeStore) {
    if (!this.toolInstance) {
      this.toolInstance = tool(
        async ({ query }) => {
          const retriever = store.asRetriever({ k: 3 });
          const result = await retriever.invoke(query);
          return result.map(d => d.pageContent).join('\n\n');
        },
        {
          name: 'pinecone_tool',
          description: 'Search relevant legal information by semantic vector request.',
          schema: z.object({
            query: z.string(),
          }),
        },
      );
    }
    return this.toolInstance;
  }
}
