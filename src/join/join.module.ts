import { Module } from '@nestjs/common';
import { JoinService } from './join.service';
import { JoinController } from './join.controller';
import { UserModule } from 'src/user/user.module';
import { ExamModule } from 'src/exam/exam.module';

@Module({
  imports: [UserModule, ExamModule],
  controllers: [JoinController],
  providers: [JoinService],
})
export class JoinModule {}
