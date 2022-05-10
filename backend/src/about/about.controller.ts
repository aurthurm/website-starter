import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AboutService } from './about.service';
import { AboutDto } from './dto/about.dto';
import { About } from './schemas/about.schema';

@ApiBearerAuth()
@Controller('about')
@ApiTags('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Post('')
  @ApiOperation({ summary: 'Create About' })
  @ApiBody({
    description: 'Required About Body fields to create a About.',
    type: AboutDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: About })
  async saveAbout(@Body() createDto: AboutDto) {
    return await this.aboutService.saveAbout(createDto);
  }

  @Get('')
  @ApiResponse({
    status: 200,
    description: 'The found record listing',
    type: About,
  })
  async aboutFindAll(): Promise<About[]> {
    return this.aboutService.aboutFindAll();
  }

  @Get(':title')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: About,
  })
  async aboutFindOne(@Param('title') title: string): Promise<About> {
    return this.aboutService.aboutFindOne(title);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'About delete by id',
    type: About,
  })
  async aboutDelete(@Param('id') id: string) {
    return this.aboutService.aboutDelete(id);
  }
}
