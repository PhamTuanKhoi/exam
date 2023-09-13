import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Exam, ExamSchema } from './schema/exam.schema';
import { SubjectModule } from 'src/subject/subject.module';

@Module({
  imports: [
    SubjectModule,
    MongooseModule.forFeature([{ name: Exam.name, schema: ExamSchema }]),
  ],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
