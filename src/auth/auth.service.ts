import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user)
      throw new HttpException(`email incorrect !`, HttpStatus.NOT_FOUND);

    const match_email = await bcrypt.compare(pass, user?.password);

    if (!match_email)
      throw new HttpException(`password incorrect !`, HttpStatus.BAD_GATEWAY);

    if (user && match_email) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (!user)
      throw new HttpException(`email incorrect !`, HttpStatus.NOT_FOUND);

    const payload = { username: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    return this.userService.create(registerUserDto);
  }

  async verifyJwt(jwt: string) {
    try {
      if (!jwt) throw new UnauthorizedException();

      const { sub, exp } = await this.jwtService.verifyAsync(jwt);

      const data = await this.userService.findById(sub);

      return { user: data, exp };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
