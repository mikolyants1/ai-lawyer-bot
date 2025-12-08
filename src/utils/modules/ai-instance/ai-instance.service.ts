import { Injectable } from '@nestjs/common';
import { ReactAgent, createAgent } from 'langchain';
import { IndexService } from '../indexes/index.service';
import { PineconeStore } from '@langchain/pinecone';
import { AiInstance } from 'src/utils/instances/ai-instance.utils';
import { PineconeTool } from './tools/pinecone.tool';
import { LAW_INDEX } from '../indexes/consts/index.const';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { SYSTEM_LAW_PROMPT } from './utils/prompt.utils';

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
      const model = AiInstance.getLlm();
      model.pipe(new JsonOutputParser());

      this.agent = createAgent({
        model,
        tools: [pineconeTool],
        systemPrompt: SYSTEM_LAW_PROMPT,
      });
    }
    return this.agent;
  }
}
