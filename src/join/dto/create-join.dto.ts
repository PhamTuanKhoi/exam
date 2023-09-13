import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateJoinDto {
  @IsNotEmpty()
  @IsNumber()
  scores: number;

  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  exam: string;
}
