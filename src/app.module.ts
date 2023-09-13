import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamModule } from './exam/exam.module';
import { SubjectModule } from './subject/subject.module';
import { QuestionModule } from './question/question.module';
import { JoinModule } from './join/join.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mongodbnodejs:mongodbnodejs@serverpost.mgmi4.mongodb.net/PHAMTUANKHOI_DB_TESTING',
    ),
    UserModule,
    AuthModule,
    ExamModule,
    SubjectModule,
    QuestionModule,
    JoinModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
