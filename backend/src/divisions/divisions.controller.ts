import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DivisionsService } from './divisions.service';
import { CategoryDTO } from './dto/category.dto';
import { TagDTO } from './dto/tag.dto';
import { Category } from './schemas/category.schema';
import { Tag } from './schemas/tag.schema';

@ApiBearerAuth()
@ApiTags('divisions')
@Controller('divisions')
export class DivisionsController {
  constructor(private readonly divisionsService: DivisionsService) {}

  // Categories
  @Post('/categories')
  @ApiOperation({ summary: 'Create or Update Categories' })
  @ApiBody({
    description: 'Required Category Body fields to create a Category.',
    type: CategoryDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: Category })
  async saveCategory(@Body() createCatDto: CategoryDTO): Promise<Category> {
    return await this.divisionsService.saveCategory(createCatDto);
  }

  @Get('/categories')
  @ApiResponse({
    status: 200,
    description: 'The found record listing',
    type: Category,
  })
  async categoryFindAll(): Promise<Category[]> {
    return await this.divisionsService.categoryFindAll();
  }

  @Get('/categories/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Category,
  })
  async categoryFindOne(@Param('id') id: string): Promise<Category> {
    return await this.divisionsService.categoryFindOne(id);
  }

  @Delete('/categories/:id')
  @ApiResponse({
    status: 200,
    description: 'Category delete by id',
    type: Category,
  })
  async categoryDelete(@Param('id') id: string): Promise<Category> {
    return await this.divisionsService.categoryDelete(id);
  }

  // Tags
  @Post('/tags')
  @ApiOperation({ summary: 'Create or Update Tag' })
  @ApiBody({
    description: 'Required Tag Body fields to create a Tag.',
    type: TagDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: Tag })
  async saveTag(@Body() createCatDto: TagDTO) {
    return await this.divisionsService.saveTag(createCatDto);
  }

  @Get('/tags')
  @ApiResponse({
    status: 200,
    description: 'The found record listing',
    type: Tag,
  })
  async tagFindAll(): Promise<Tag[]> {
    return await this.divisionsService.tagFindAll();
  }

  @Get('/tags/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Tag,
  })
  async tagFindOne(@Param('id') id: string): Promise<Tag> {
    return this.divisionsService.tagFindOne(id);
  }

  @Delete('/tags/:id')
  @ApiResponse({
    status: 200,
    description: 'Tag delete by id',
    type: Tag,
  })
  async tagDelete(@Param('id') id: string) {
    return this.divisionsService.tagDelete(id);
  }
}
