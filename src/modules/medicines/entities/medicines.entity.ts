/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'medicines' })
export default class Medicine {
  @ApiProperty({
    example: '1',
    description: 'id of medicine',
  })
  @PrimaryGeneratedColumn('increment')
  @Expose()
  id: number;

  @ApiProperty({
    example: 'medicine',
    description: 'acetaminofen',
  })
  @Column({
    nullable: false,
  })
  name: string;

  @ApiProperty({
    example: 'provider',
    description: 'isss',
  })
  @Column({
    nullable: false,
  })
  provider: string;

  @ApiProperty({
    example: 'cost',
    description: '5.5',
  })
  @Column({
    nullable: false,
  })
  cost: string;

  @ApiProperty({
    example: 'selling_price',
    description: '8.5',
  })
  @Column({
    name: 'selling_price',
    nullable: false,
  })
  sellingPrice: string;
}
