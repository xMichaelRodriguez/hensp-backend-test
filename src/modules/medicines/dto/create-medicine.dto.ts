/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateMedicineDto {
  @ApiProperty({
    example: 'acetaminofen',
  })
  @IsNotEmpty()
   name: string;

   @ApiProperty({
    example: 'FARMACOS',
  })
  @IsNotEmpty()
  provider: string;

  @ApiProperty({
    example: '5',
  })
  @IsNotEmpty()
  cost: string;

  @ApiProperty({
    example: '10',
  })
  @IsNotEmpty()
  sellingPrice: string;
  
}
