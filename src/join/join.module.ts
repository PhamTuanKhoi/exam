import { Module } from '@nestjs/common';
import { JoinService } from './join.service';
import { JoinController } from './join.controller';
import { UserModule } from 'src/user/user.module';
import { ExamModule } from 'src/exam/exam.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Join, JoinSchema } from './entities/join.schema';

@Module({
  imports: [
    UserModule,
    ExamModule,
    MongooseModule.forFeature([{ name: Join.name, schema: JoinSchema }]),
  ],
  controllers: [JoinController],
  providers: [JoinService],
})
export class JoinModule {}
