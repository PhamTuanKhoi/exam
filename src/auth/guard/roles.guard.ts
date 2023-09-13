import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoleEnum } from 'src/user/dto/user-role.enum';
import { AuthService } from '../auth.service';
import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException();

    const authPath = authHeader.split(' '); // ['bearer', 'token']

    if (authPath.length !== 2) throw new UnauthorizedException();

    const [, jwt] = authPath;

    const { user } = await this.authService.verifyJwt(jwt);

    return requiredRoles.some((role) => user?.role === role);
  }
}
