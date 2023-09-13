import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from 'src/user/dto/user-role.enum';

export const ROLES_KEY = 'role';
export const Roles = (...role: string[]) => SetMetadata(ROLES_KEY, role);
