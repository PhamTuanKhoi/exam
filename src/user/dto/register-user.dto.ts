import { IsEmail, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { UserRoleEnum } from './user-role.enum';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @Type(() => String)
  @IsEnum([UserRoleEnum.ADMIN, UserRoleEnum.USER])
  role: string;
}
