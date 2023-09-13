import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamService } from 'src/exam/exam.service';
import { HistoryService } from 'src/history/history.service';
import { QuestionService } from 'src/question/question.service';
import { UserService } from 'src/user/user.service';
import { ChooseQuestionDto } from './dto/choose-question.dto';
import { CreateJoinDto } from './dto/create-join.dto';
import { UpdateJoinDto } from './dto/update-join.dto';
import { Join } from './entities/join.schema';

@Injectable()
export class JoinService {
  constructor(
    @InjectModel(Join.name) private model: Model<Join>,
    private userService: UserService,
    private examService: ExamService,
    private questionService: QuestionService,
    private historyService: HistoryService,
  ) {}
  async create(createJoinDto: CreateJoinDto, userId: string) {
    try {
      await Promise.all([
        this.userService.isModelExist(userId),
        this.examService.isModelExist(createJoinDto.exam),
      ]);

      const created = await this.model.create(createJoinDto);

      return created;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async chooseAnswer(chooseQuestionDto: ChooseQuestionDto, userId) {
    try {
      const join = await this.findJoinByUserIdAndExamId(
        userId,
        chooseQuestionDto.exam,
      );

      if (!join) throw new HttpException('error server', HttpStatus.NOT_FOUND);

      const question = await this.questionService.isModelExist(
        chooseQuestionDto.question,
      );

      if (question?.result.toString() === chooseQuestionDto.answer) {
        const updated = await this.model.findByIdAndUpdate(join?._id, {
          scores: join.scores + 1,
        });
      }

      await this.historyService.create({
        question: question?._id.toString(),
        exam: chooseQuestionDto.exam,
        user: userId,
        answer: chooseQuestionDto.answer,
        result: question.result,
      });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  findJoinByUserIdAndExamId(userId: string, examId: string) {
    return this.model.findOne({
      user: userId,
      exam: examId,
    });
  }
}
