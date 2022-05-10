import { Model } from 'mongoose';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { About, AboutDocument } from './schemas/about.schema';
import { AboutDto } from '../about/dto/about.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AboutService {
  private readonly logger = new Logger(AboutService.name);

  constructor(
    @InjectModel(About.name)
    private aboutModel: Model<AboutDocument>,
  ) {}

  async saveAbout(about: AboutDto): Promise<About> {
    if (['', null, undefined].includes(about._id)) {
      delete about['_id'];
      return await this.aboutCreate(about);
    } else {
      return await this.aboutUpdate(about);
    }
  }

  async aboutCreate(about: AboutDto): Promise<About> {
    const instance = new this.aboutModel(about);
    return await instance.save();
  }

  async aboutUpdate(updateData: AboutDto) {
    const article = await this.aboutModel
      .findByIdAndUpdate(updateData._id, updateData)
      .setOptions({ overwrite: true, new: true });
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }
  async aboutFindAll(): Promise<About[]> {
    return this.aboutModel.find().exec();
  }

  async aboutFindOne(title: string): Promise<About> {
    return this.aboutModel.findOne({ title }).exec();
  }

  async aboutDelete(id: string) {
    const deletedCat = await this.aboutModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
