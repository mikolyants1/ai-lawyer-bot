import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiAdminService } from './admin.service';
import { ApiAdminGuard } from 'src/guards/api-admin.guard';

@Controller('admin')
export class ApiAdminController {
  constructor(private readonly service: ApiAdminService) {}

  @Post('index/upload')
  @UseGuards(ApiAdminGuard)
  async uploadToIndex() {
    return this.service.uploadToStore();
  }

  @Post('index/stats')
  @UseGuards(ApiAdminGuard)
  async getIndexStats() {
    return this.service.getStats();
  }
}
