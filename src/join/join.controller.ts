import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JoinService } from './join.service';
import { CreateJoinDto } from './dto/create-join.dto';
import { UpdateJoinDto } from './dto/update-join.dto';

@Controller('join')
export class JoinController {
  constructor(private readonly joinService: JoinService) {}

  @Post()
  create(@Body() createJoinDto: CreateJoinDto) {
    return this.joinService.create(createJoinDto);
  }

  @Get()
  findAll() {
    return this.joinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.joinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJoinDto: UpdateJoinDto) {
    return this.joinService.update(+id, updateJoinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.joinService.remove(+id);
  }
}
