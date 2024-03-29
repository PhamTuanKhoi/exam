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

  constructor(@InjectModel(User.name) private model: Model<User>) {}

  // {
  //   "name": "Pham Tuan Thanh",
  //   "email": "thanh@gmail.com",
  //   "password": "1234",
  //   "role": "user"
  // }
  async create(registerUserDto: RegisterUserDto) {
    try {
      const email_exist = await this.findByEmail(registerUserDto.email);

      if (email_exist)
        throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);

      registerUserDto.password = await bcrypt.hash(
        registerUserDto.password,
        10,
      );

      const created = await this.model.create({
        ...registerUserDto,
      });

      this.logger.log(`Register user success`, created?._id);
      return created;
    } catch (error) {
      this.logger.error(error?.message, error.stack);
      throw new BadRequestException(error?.message);
    }
  }

  async block(id: string) {
    try {
      const user = await this.isModelExist(id);

      const updated = await this.model.findByIdAndUpdate(id, {
        block: !user.block,
      });

      this.logger.log(`block user ${updated?.block} success`, updated?._id);
      return updated;
    } catch (error) {
      this.logger.error(error?.message, error.stack);
      throw new BadRequestException(error?.message);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findById(id: string) {
    return this.model.findById(id).lean();
  }

  async findByEmail(email: string) {
    return this.model.findOne({ email }).select('+password').lean();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async isModelExist(id, isOptional = false, msg = '') {
    if (isOptional && !id) return;
    const errorMessage = msg || `${User.name} not found`;
    const isExist = await this.findById(id);
    if (!isExist) throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    return isExist;
  }
}
