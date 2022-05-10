import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DepartmentsService } from './departments.service';
import { DepartmentDTO } from './dto/department.dto';
import { Department } from './schemas/department.schema';

@ApiBearerAuth()
@Controller('departments')
@ApiTags('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post('')
  @ApiOperation({ summary: 'Create Department' })
  @ApiBody({
    description: 'Required Department Body fields to create a Department.',
    type: DepartmentDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: Department })
  async saveDepartment(@Body() createDto: DepartmentDTO) {
    return await this.departmentsService.saveDepartment(createDto);
  }

  @Get('')
  @ApiResponse({
    status: 200,
    description: 'The found record listing',
    type: Department,
  })
  async departmentFindAll(): Promise<Department[]> {
    return this.departmentsService.departmentFindAll();
  }

  @Get(':title')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Department,
  })
  async departmentFindOne(@Param('title') title: string): Promise<Department> {
    return this.departmentsService.departmentFindOne(title);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Department delete by id',
    type: Department,
  })
  async departmentDelete(@Param('id') id: string) {
    return this.departmentsService.departmentDelete(id);
  }
}
