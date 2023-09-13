import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(@InjectModel(History.name) private model: Model<History>) {}

  create(createHistoryDto: CreateHistoryDto) {
    return this.model.create(createHistoryDto);
  }
}
