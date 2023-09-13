import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JoinService } from './join.service';
import { CreateJoinDto } from './dto/create-join.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserRoleEnum } from 'src/user/dto/user-role.enum';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { ChooseQuestionDto } from './dto/choose-question.dto';

@Controller('join')
export class JoinController {
  constructor(private readonly joinService: JoinService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRoleEnum.USER)
  async create(@Body() createJoinDto: CreateJoinDto, @Request() req) {
    return this.joinService.create(createJoinDto, req.user.userId);
  }

  @Post('choose-answer')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRoleEnum.USER)
  async chooseAnswer(
    @Body() chooseQuestionDto: ChooseQuestionDto,
    @Request() req,
  ) {
    return this.joinService.chooseAnswer(chooseQuestionDto, req.user.userId);
  }
}
