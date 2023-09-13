import { Injectable } from '@nestjs/common';
import { CreateJoinDto } from './dto/create-join.dto';
import { UpdateJoinDto } from './dto/update-join.dto';

@Injectable()
export class JoinService {
  create(createJoinDto: CreateJoinDto) {
    return 'This action adds a new join';
  }
}
