import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamService } from 'src/exam/exam.service';
import { UserService } from 'src/user/user.service';
import { CreateJoinDto } from './dto/create-join.dto';
import { UpdateJoinDto } from './dto/update-join.dto';
import { Join } from './entities/join.schema';

@Injectable()
export class JoinService {
  constructor(
    @InjectModel(Join.name) private model: Model<Join>,
    private userService: UserService,
    private examService: ExamService,
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
}
