import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SliderService } from './slider.service';
import { SliderDto } from './dto/slider.dto';
import { Slider } from './shemas/slider.shema';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageResizer, multerOptions } from 'src/utils/upload';

@ApiBearerAuth()
@ApiTags('slider')
@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Slider was successfully created',
    type: Slider,
  })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async saveSlider(
    @Body() createSliderDto: SliderDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await imageResizer(file);
    return await this.sliderService.saveSlider(createSliderDto, file);
  }

  @Get('')
  @ApiResponse({
    status: 200,
    description: 'The found record listing',
    type: Slider,
  })
  async sliderFindAll(): Promise<Slider[]> {
    return this.sliderService.sliderFindAll();
  }

  @Get(':title')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Slider,
  })
  async sliderFindOne(@Param('title') title: string): Promise<Slider> {
    return this.sliderService.sliderFindOne(title);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Slider delete by id',
    type: Slider,
  })
  async sliderDelete(@Param('id') id: string) {
    return this.sliderService.sliderDelete(id);
  }

  @Delete('featured-image/:id')
  async deleteFeatureImage(@Param('id') id: string, @Request() req) {
    return await this.sliderService.deleteFeatureImage(id, req.query.filepath);
  }
}
