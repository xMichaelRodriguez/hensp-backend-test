/* eslint-disable prettier/prettier */
import { Role } from 'src/modules/role/entities/role.entity';

export interface JwtPayload {
  id: number;
  email: string;
  role: Role;
}
