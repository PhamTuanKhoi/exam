import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRoleEnum } from 'src/user/dto/user-role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRoleEnum.ADMIN)
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findById(id);
  }

  @Patch('like/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRoleEnum.USER)
  like(@Param('id') id: string, @Request() req) {
    return this.subjectService.like(id, req?.user?.userId);
  }
}
