import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JoinService } from './join.service';
import { CreateJoinDto } from './dto/create-join.dto';
import { UpdateJoinDto } from './dto/update-join.dto';
import { UserService } from 'src/user/user.service';
import { ExamService } from 'src/exam/exam.service';

@Controller('join')
export class JoinController {
  constructor(
    private readonly joinService: JoinService,
    private userService: UserService,
    private examService: ExamService,
  ) {}

  @Post()
  async create(@Body() createJoinDto: CreateJoinDto) {
    await Promise.all([
      this.userService.isModelExist(createJoinDto.user),
      this.examService.isModelExist(createJoinDto.exam),
    ]);

    return this.joinService.create(createJoinDto);
  }
}
