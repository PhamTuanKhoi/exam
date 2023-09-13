import { IsString, IsNotEmpty } from 'class-validator';

export class ChooseQuestionDto {
  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  exam: string;
}
