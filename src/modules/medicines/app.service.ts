import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Medicine from './entities/medicines.entity';
import { Repository } from 'typeorm';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { PaginatedServicesDto } from './dto/pagination.dto';
import { OrderType } from './enums';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(Medicine)
    private medicineRepository: Repository<Medicine>,
  ) {}
  getMedicines(): Promise<Medicine[]> {
    return this.medicineRepository.find();

    // return this.medicineRepository
    //   .createQueryBuilder('medicines')
    //   .where('medicines.name like :name', { name: `${name}%` })
    //   .getMany();
  }

  async createMedicine(createMedicine: CreateMedicineDto) {
    const medicineToSave = this.medicineRepository.create(createMedicine);

    try {
      return await this.medicineRepository.save(medicineToSave);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        'error al intentar crear medicamento',
      );
    }
  }

  async updateMedicine(id: number, updateMedicineDto: UpdateMedicineDto) {
    try {
      await this.medicineRepository.update(updateMedicineDto, { id });
      return 'medicamento actualizado';
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        'error intentando actualizar medicamento',
      );
    }
  }
  async deleteMedicine(id: number) {
    try {
      await this.medicineRepository.delete({ id });
      return 'medicamento eliminado';
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        'error al intentar eliminar el medicamento',
      );
    }
  }

  async paginate(
    page: number,
    limit: number,
    order: OrderType,
  ): Promise<PaginatedServicesDto> {
    try {
      const offset = (page - 1) * limit;

      const [data, total] = await this.medicineRepository
        .createQueryBuilder('medicines')
        .orderBy('medicines.name', order)
        .skip(offset)
        .take(limit)
        .getManyAndCount();

      const nextPage =
        total > offset + limit
          ? `http://localhost:3000/api/v1/medicines?page=${
              page + 1
            }&limit=${limit}`
          : null;
      const prevPage =
        offset > 0
          ? `http://localhost:3000/api/v1/medicines?page=${
              page - 1
            }&limit=${limit}`
          : null;
      return { data, total, prevPage, nextPage };
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException('Error trying search services');
    }
  }
}
