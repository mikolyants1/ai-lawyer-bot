import { Module } from '@nestjs/common';
import { IndexModule } from 'src/utils/modules/indexes/index.module';
import { ApiAdminService } from './admin.service';
import { ApiAdminController } from './admin.controller';

@Module({
  imports: [IndexModule],
  controllers: [ApiAdminController],
  providers: [ApiAdminService],
})
export class ApiAdminModule {}
