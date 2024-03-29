import { IsString, IsNotEmpty } from 'class-validator';
export class CreateSubjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
