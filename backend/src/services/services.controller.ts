import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { ServiceDto } from './dto/service.dto';
import { Service } from './schemas/service.schema';

@ApiBearerAuth()
@Controller('services')
@ApiTags('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post('')
  @ApiOperation({ summary: 'Create Service' })
  @ApiBody({
    description: 'Required Service Body fields to create a Service.',
    type: ServiceDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: Service })
  async saveService(@Body() createDto: ServiceDto) {
    return await this.servicesService.saveService(createDto);
  }

  @Get('')
  @ApiResponse({
    status: 200,
    description: 'The found record listing',
    type: Service,
  })
  async serviceFindAll(): Promise<Service[]> {
    return this.servicesService.serviceFindAll();
  }

  @Get(':title')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Service,
  })
  async serviceFindOne(@Param('title') title: string): Promise<Service> {
    return this.servicesService.serviceFindOne(title);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Service delete by id',
    type: Service,
  })
  async serviceDelete(@Param('id') id: string) {
    return this.servicesService.serviceDelete(id);
  }
}
