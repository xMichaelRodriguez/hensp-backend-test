/* eslint-disable prettier/prettier */
import { IsArray, IsNumber } from 'class-validator';
import Medicine from '../entities/medicines.entity';

export class PaginatedServicesDto {
  @IsArray()
  data: Medicine[];
  @IsNumber()
  total: number;

  prevPage: string | null;
  nextPage: string | null;
}
