import { Model } from 'mongoose';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Slider, SliderDocument } from './shemas/slider.shema';
import { SliderDto } from './dto/slider.dto';
import { InjectModel } from '@nestjs/mongoose';
import { deleteFile, duplicateFileCleaner } from 'src/utils/upload';

@Injectable()
export class SliderService {
  private readonly logger = new Logger(SliderService.name);

  constructor(
    @InjectModel(Slider.name)
    private sliderModel: Model<SliderDocument>,
  ) {}

  async saveSlider(
    slider: SliderDto,
    file: Express.Multer.File,
  ): Promise<Slider> {
    if (['', null, undefined, 'null', 'undefined'].includes(slider._id)) {
      delete slider['_id'];
      return await this.createSlider(slider, file);
    } else {
      return await this.updateSlider(slider['_id'], slider, file);
    }
  }

  async createSlider(
    slider: SliderDto,
    file: Express.Multer.File,
  ): Promise<Slider> {
    const createdSlider = new this.sliderModel({
      ...slider,
      featuredImage: file?.path,
    });
    return createdSlider.save();
  }

  async updateSlider(
    id: string,
    updateData: SliderDto,
    file: Express.Multer.File,
  ) {
    const slider = await this.sliderModel
      .findByIdAndUpdate(id, { ...updateData })
      .setOptions({ overwrite: true, new: true });
    if (!slider) {
      throw new NotFoundException();
    }
    if (file) {
      const filePath = await duplicateFileCleaner(
        file.path,
        slider.featuredImage,
      );
      slider.featuredImage = filePath;
    }
    return await slider.save();
  }

  async deleteFeatureImage(id: string, filePath: string): Promise<Slider> {
    const slider = await this.sliderModel.findById(id);
    slider.featuredImage = undefined;
    if (!slider) {
      throw new NotFoundException();
    }
    try {
      await deleteFile(filePath);
    } catch (err) {
      console.error(err);
    }
    return slider.save();
  }

  async sliderFindAll(): Promise<Slider[]> {
    return this.sliderModel.find().exec();
  }

  async sliderFindOne(title: string): Promise<Slider> {
    return this.sliderModel.findOne({ title }).exec();
  }

  async sliderDelete(id: string) {
    const deletedCat = await this.sliderModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
