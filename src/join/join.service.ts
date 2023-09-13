import { Injectable } from '@nestjs/common';
import { CreateJoinDto } from './dto/create-join.dto';
import { UpdateJoinDto } from './dto/update-join.dto';

@Injectable()
export class JoinService {
  create(createJoinDto: CreateJoinDto) {
    return 'This action adds a new join';
  }

  findAll() {
    return `This action returns all join`;
  }

  findOne(id: number) {
    return `This action returns a #${id} join`;
  }

  update(id: number, updateJoinDto: UpdateJoinDto) {
    return `This action updates a #${id} join`;
  }

  remove(id: number) {
    return `This action removes a #${id} join`;
  }
}
