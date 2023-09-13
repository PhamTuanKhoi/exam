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
  // {"a": 2},
  //  {"b": 3},
  //  {"c": 4},
  //  {"d": 5}
  //     ],
  //     "subject": "6501649be67deba65d399025",
  //     "level": 3,
  //     "type": "choose"
  //     "result": "2 "
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
    return this.model.find();
  }

  async randomQuestion(userId: string) {
    const question = await this.model.aggregate([
      {
        $lookup: {
          from: 'subjects',
          localField: 'subject',
          foreignField: '_id',
          as: 'subject',
        },
      },
      {
        $unwind: {
          path: '$subject',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$subject.favourites',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          $expr: {
            $eq: ['$subject.favourites', { $toObjectId: userId }],
          },
        },
      },
    ]);

    if (question.length < 0) return [];

    const rndInt = Math.floor(Math.random() * question.length);

    return question[rndInt];
  }

  findOne(id: string) {
    return `This action returns a #${id} question`;
  }
}
