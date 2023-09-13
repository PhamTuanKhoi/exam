import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateJoinDto {
  @IsNotEmpty()
  @IsString()
  exam: string;
}
