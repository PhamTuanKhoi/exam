import { Module } from '@nestjs/common';
import { JoinService } from './join.service';
import { JoinController } from './join.controller';

@Module({
  controllers: [JoinController],
  providers: [JoinService],
})
export class JoinModule {}
