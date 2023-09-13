import { IsString, IsNotEmpty } from 'class-validator';

export class CreateExamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  subject: string;
}
