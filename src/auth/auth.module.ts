import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRepository } from './repository/auth.repository';
import { GlobalStateModule } from 'src/utils/modules/global-state/global-state.module';

@Module({
  imports: [GlobalStateModule],
  providers: [AuthService, AuthRepository],
  exports: [AuthService],
})
export class AuthModule {}
