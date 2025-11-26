import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdate } from './user.update';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [UserService, UserUpdate],
})
export class UserModule {}
