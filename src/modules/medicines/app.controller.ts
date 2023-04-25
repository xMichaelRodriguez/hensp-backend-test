import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import Medicine from './entities/medicines.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleAuthGuard } from 'src/guards/auth-guard';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
@ApiBearerAuth()
@ApiTags('medicamentos')
@Controller('/medicines')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({
    type: Medicine,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    schema: {
      example: {
        error: 500,
        message: 'error interno',
      },
    },
  })
  @UseGuards(AuthGuard('jwt'), new RoleAuthGuard('ADMIN', 'AUTHENTICATED'))
  @Get()
  getMedicines(): Promise<Medicine[]> {
    return this.appService.getMedicines();
  }

  @ApiOkResponse({
    type: Medicine,
  })
  @ApiInternalServerErrorResponse({
    schema: {
      example: {
        error: 500,
        message: 'error interno',
      },
    },
  })
  @UseGuards(AuthGuard('jwt'), new RoleAuthGuard('ADMIN'))
  @Post('/')
  createMedicine(@Body() createMedicineDto: CreateMedicineDto) {
    return this.appService.createMedicine(createMedicineDto);
  }

  @ApiOkResponse({
    schema: { example: 'medicamento actualizado' },
  })
  @ApiInternalServerErrorResponse({
    schema: {
      example: {
        error: 500,
        message: 'error interno',
      },
    },
  })
  @UseGuards(AuthGuard('jwt'), new RoleAuthGuard('ADMIN'))
  @Put('/:id')
  updateMedicine(
    @Param('id') id: string,
    @Body() createMedicineDto: UpdateMedicineDto,
  ) {
    console.debug({ id });
    return this.appService.updateMedicine(+id, createMedicineDto);
  }

  @ApiOkResponse({
    schema: { example: 'medicamento eliminado' },
  })
  @ApiInternalServerErrorResponse({
    schema: {
      example: {
        error: 500,
        message: 'error interno',
      },
    },
  })
  @UseGuards(AuthGuard('jwt'), new RoleAuthGuard('ADMIN'))
  @Delete('/:id')
  deleteMedicine(@Param('id') id: string) {
    return this.appService.deleteMedicine(+id);
  }
}
