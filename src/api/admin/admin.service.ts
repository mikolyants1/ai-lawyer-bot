import { Injectable } from '@nestjs/common';
import { IndexService } from 'src/utils/modules/indexes/index.service';

@Injectable()
export class ApiAdminService {
  constructor(private readonly indexService: IndexService) {}

  async uploadToStore() {
    return this.indexService.uploadToStore();
  }

  async getStats() {
    return this.indexService.getIndexStats();
  }
}
