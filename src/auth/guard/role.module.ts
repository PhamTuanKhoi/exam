import { Module } from '@nestjs/common';
import { AuthModule } from '../auth.module';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [RolesGuard],
})
export class RoleModule {}
