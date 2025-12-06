import { Injectable } from '@nestjs/common';
import { ReactAgent, createAgent } from 'langchain';
import { IndexService } from '../indexes/index.service';
import { PineconeStore } from '@langchain/pinecone';
import { AiInstance } from 'src/utils/instances/ai-instance.utils';
import { PineconeTool } from './tools/pinecone.tool';
import { LAW_INDEX } from '../indexes/consts/index.const';

@Injectable()
export class AInstanceService {
  private pineconeLawStore: PineconeStore | null = null;
  private agent: ReactAgent | null = null;

  constructor(
    private readonly indexService: IndexService,
    private readonly pineconeTool: PineconeTool,
  ) {}

  async getPineconeStore(indexName: string) {
    if (!this.pineconeLawStore) {
      const embeddings = AiInstance.getEmbedding();
      const index = await this.indexService.getOrCreateIndex(indexName);
      this.pineconeLawStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex: index,
      });
    }
    return this.pineconeLawStore;
  }

  async getAgent() {
    if (!this.agent) {
      const store = await this.getPineconeStore(LAW_INDEX);
      const pineconeTool = await this.pineconeTool.getTool(store);
      this.agent = createAgent({
        model: AiInstance.getLlm(),
        tools: [pineconeTool],
        systemPrompt:
          'You are a helpful assistant. Use the following context to answer the question.',
      });
    }
    return this.agent;
  }
}
