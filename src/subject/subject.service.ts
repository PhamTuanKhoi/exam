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

  async like(id: string, userId: string) {
    try {
      const subject = await this.isModelExist(id);

      const like = subject?.favourites?.map(
        (item) => userId === item.toString(),
      );

      if (like?.length === 0) {
        const updated = await this.model.findByIdAndUpdate(
          id,
          {
            favourites: [...subject?.favourites, userId],
          },
          { new: true },
        );

        this.logger.log(`update like subject success`, updated?._id);
        return updated;
      } else {
        const updated = await this.model.findByIdAndUpdate(
          id,
          {
            favourites: subject?.favourites?.filter(
              (i) => i.toString() !== userId,
            ),
          },
          { new: true },
        );

        this.logger.log(`update like subject success`, updated?._id);
        return updated;
      }
    } catch (error) {
      this.logger.error(error?.message, error.stack);
      throw new BadRequestException(error?.message);
    }
  }

  findAll() {
    return this.model.find();
  }

  findById(id: string) {
    return this.model.findById(id).lean();
  }

  async isModelExist(id, isOptional = false, msg = '') {
    if (isOptional && !id) return;
    const errorMessage = msg || `${Subject.name} not found`;
    const isExist = await this.findById(id);
    if (!isExist) throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    return isExist;
  }
}
