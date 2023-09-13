import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRoleEnum } from './dto/user-role.enum';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private modle: Model<User>) {}

  async create(registerUserDto: RegisterUserDto) {
    try {
      const email_exist = await this.findByEmail(registerUserDto.email);

      if (email_exist)
        throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);

      registerUserDto.password = await bcrypt.hash(
        registerUserDto.password,
        10,
      );

      const created = await this.modle.create({
        ...registerUserDto,
      });

      this.logger.log(`Register user success`, created?._id);
      return created;
    } catch (error) {
      this.logger.error(error?.message, error.stack);
      throw new BadRequestException(error?.message);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findById(id: string) {
    return this.modle.findById(id).lean();
  }

  async findByEmail(email: string) {
    return await this.modle.findOne({ email }).lean();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
