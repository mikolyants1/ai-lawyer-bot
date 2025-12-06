import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Index, Pinecone } from '@pinecone-database/pinecone';
import { AiInstance } from 'src/utils/instances/ai-instance.utils';
import { CacheService } from '../cache/cache.service';
import { LAW_INDEX } from './consts/index.const';
import { join } from 'path';
import { promises } from 'fs';
import { IPineconeStore } from './types/pinecone.types';
import { delay } from 'src/utils/delay.utils';
import { fromSet } from 'src/utils/array.utils';

@Injectable()
export class IndexService implements OnApplicationBootstrap {
  private readonly storePath = join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    '..',
    'uploads',
    'store1.json',
  );
  private readonly uploadQueries: Set<Promise<any>>;
  private readonly logger: Logger;
  private readonly pinecone: Pinecone;

  constructor(private readonly cacheService: CacheService) {
    this.pinecone = AiInstance.getPinecone();
    this.logger = new Logger(IndexService.name);
    this.uploadQueries = new Set<Promise<any>>();
  }

  async onApplicationBootstrap() {
    await this.initialyzeIndexes();
  }

  private async initialyzeIndexes() {
    try {
      const { indexes } = await this.pinecone.listIndexes();
      if (!indexes) return this.logger.log('indexes not found');
      const indexNames = indexes.map(i => i.name);
      await this.cacheService.setIndexes(indexNames);
    } catch (e) {
      this.logger.log(e);
    }
  }

  async getOrCreateIndex(name: string) {
    const indexes = await this.cacheService.getIndexes();
    const isExist = indexes.includes(name);
    if (!isExist) {
      return this.createIndex(name).then(async () => {
        await this.initialyzeIndexes();
        return this.pinecone.Index(name);
      });
    }
    return this.pinecone.Index(name);
  }

  private async createIndex(name: string) {
    return this.pinecone.createIndex({
      name,
      vectorType: 'dense',
      dimension: 1536,
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1',
        },
      },
    });
  }

  async uploadToStore() {
    const index = await this.getOrCreateIndex(LAW_INDEX);
    const data = await promises
      .readFile(this.storePath, 'utf8')
      .then(json => JSON.parse(json) as IPineconeStore[]);
    for (let i = 0; i < data.length; i++) {
      this.uploadQueries.add(this.uploadData(data[i], index));
    }
    await Promise.all(fromSet(this.uploadQueries)).then(() => this.logger.log('success added'));
    this.uploadQueries.clear();
  }

  async getIndexStats() {
    const index = await this.getOrCreateIndex(LAW_INDEX);
    return index.describeIndexStats();
  }
  private async uploadData(data: IPineconeStore, index: Index) {
    const embeddings = AiInstance.getEmbedding();
    const text = `${data.metadata.category}.${data.metadata.title}.${data.text}`;
    const [values] = await embeddings.embedDocuments([text]);
    await index.upsert([
      {
        id: data.id,
        metadata: data.metadata,
        values,
      },
    ]);
    await delay(2000);
  }
}
