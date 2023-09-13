import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubjectService } from 'src/subject/subject.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './schema/question.schema';

@Injectable()
export class QuestionService {
  private readonly logger = new Logger(QuestionService.name);

  constructor(
    @InjectModel(Question.name) private model: Model<Question>,
    private subjectService: SubjectService,
  ) {}

  // {
  //   "name": "1 + 1 = ?",
  //   "answer": [
  //     {"a": 2},
  //      {"b": 3},
  //      {"c": 4},
  //      {"d": 5}
  //     ],
  //     "subject": "6501649be67deba65d399025",
  //     "level": 3,
  //     "type": "choose"
  // }
  async create(createQuestionDto: CreateQuestionDto) {
    try {
      await this.subjectService.isModelExist(createQuestionDto.subject);

      const created = await this.model.create(createQuestionDto);

      this.logger.log(`created a user by id #${created?._id}`);

      return created;
    } catch (error) {
      this.logger.error(error?.message, error.stack);
      throw new BadRequestException(error?.message);
    }
  }

  findAll() {
    return `This action returns all question`;
  }

  findOne(id: string) {
    return `This action returns a #${id} question`;
  }

  update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: string) {
    return `This action removes a #${id} question`;
  }
}
