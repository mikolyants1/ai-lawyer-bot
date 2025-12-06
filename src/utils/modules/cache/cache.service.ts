import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { type Cache } from 'cache-manager';
import { INDEXES_KEY } from './consts/cache.const';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async getIndexes() {
    const indexes = await this.cache.get<string[]>(INDEXES_KEY);
    return indexes ?? [];
  }

  async setIndexes(indexes: string[]) {
    const currentIndexes = await this.getIndexes();
    const uniqueIndexes = new Set<string>([...currentIndexes, ...indexes]);
    const newIndexes = Array.from(uniqueIndexes.values());
    await this.cache.set<string[]>(INDEXES_KEY, newIndexes);
  }
}
