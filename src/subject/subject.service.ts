import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './schema/subject.schema';

@Injectable()
export class SubjectService {
  private readonly logger = new Logger(SubjectService.name);

  constructor(@InjectModel(Subject.name) private model: Model<Subject>) {}

  async create(createSubjectDto: CreateSubjectDto) {
    try {
      const subject_exist_name = await this.findByName(createSubjectDto.name);

      if (subject_exist_name)
        throw new HttpException('name subject is exist', HttpStatus.CONFLICT);

      const created = await this.model.create(createSubjectDto);

      this.logger.log(`Register user success`, created?._id);
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
    return `This action returns all subject`;
  }

  findOne(id: string) {
    return `This action returns a #${id} subject`;
  }

  update(id: string, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: string) {
    return `This action removes a #${id} subject`;
  }
}
