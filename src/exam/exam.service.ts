import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubjectService } from 'src/subject/subject.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './schema/exam.schema';

@Injectable()
export class ExamService {
  private readonly logger = new Logger(ExamService.name);

  constructor(
    @InjectModel(Exam.name) private model: Model<Exam>,
    private subjectService: SubjectService,
  ) {}

  async create(createExamDto: CreateExamDto) {
    try {
      await this.subjectService.isModelExist(createExamDto.subject);

      const exam_exist_name = await this.findByName(createExamDto.name);

      if (exam_exist_name)
        throw new HttpException('name subject is exist', HttpStatus.CONFLICT);

      const created = await this.model.create(createExamDto);

      this.logger.log(`created a user by id #${created?._id}`);

      return created;
    } catch (error) {
      this.logger.error(error?.message, error.stack);
      throw new BadRequestException(error?.message);
    }
  }

  async findByName(name: string) {
    return this.model.findOne({ name }).lean();
  }

  findAll() {
    return this.model.find();
  }

  findById(id: string) {
    return this.model.findById(id).lean();
  }

  async isModelExist(id, isOptional = false, msg = '') {
    if (isOptional && !id) return;
    const errorMessage = msg || `${Exam.name} not found`;
    const isExist = await this.findById(id);
    if (!isExist) throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    return isExist;
  }
}
