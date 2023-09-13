import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { QuestionTypeEnum } from './question-type.enum';
export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  answer: Object[];

  @IsNotEmpty()
  @Type(() => String)
  @IsEnum([QuestionTypeEnum.BOOLEAN, QuestionTypeEnum.CHOOSE])
  type: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  level: number;

  @IsNotEmpty()
  @IsString()
  result: string;

  @IsNotEmpty()
  subject: string;
}
