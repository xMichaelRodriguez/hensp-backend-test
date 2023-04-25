/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Medicine from './entities/medicines.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine])],
  controllers: [AppController],
  providers: [AppService],
})
export class MedicineModule {}
