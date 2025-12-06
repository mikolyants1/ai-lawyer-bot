import { Module } from '@nestjs/common';
import { CacheModule } from '../cache/cache.module';
import { IndexService } from './index.service';

@Module({
  imports: [CacheModule],
  providers: [IndexService],
  exports: [IndexService],
})
export class IndexModule {}
