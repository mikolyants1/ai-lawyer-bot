import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { Pinecone } from '@pinecone-database/pinecone';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { EModel } from 'src/enums/model.enum';

export class AiInstance {
  private static pinecone: Pinecone | null = null;
  private static llm: ChatOpenAI | null = null;
  private static embeddings: OpenAIEmbeddings | null = null;
  private static splitter: RecursiveCharacterTextSplitter | null = null;

  static getSplitter() {
    if (!this.splitter) {
      this.splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });
    }
    return this.splitter;
  }

  static getPinecone() {
    if (!this.pinecone) {
      this.pinecone = new Pinecone({
        apiKey: process.env.PINECONE_KEY!,
      });
    }
    return this.pinecone;
  }

  static getLlm() {
    if (!this.llm) {
      this.llm = new ChatOpenAI({
        model: EModel.CHAT_GPT_OSS,
        temperature: 0.3,
        apiKey: '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',
        configuration: {
          baseURL: 'https://openrouter.ai/api/v1',
        },
      });
    }
    return this.llm;
  }

  static getEmbedding() {
    if (!this.embeddings) {
      this.embeddings = new OpenAIEmbeddings({
        model: EModel.QWEN_EMBEDDING,
        apiKey: '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',
        configuration: {
          baseURL: 'https://openrouter.ai/api/v1',
        },
      });
    }
    return this.embeddings;
  }
}
