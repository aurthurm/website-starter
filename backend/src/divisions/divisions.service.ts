import { Model } from 'mongoose';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from './schemas/tag.schema';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CategoryDTO } from './dto/category.dto';
import { TagDTO } from './dto/tag.dto';

@Injectable()
export class DivisionsService {
  private readonly logger = new Logger(DivisionsService.name);

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
  ) {}

  // Categories
  async saveCategory(category: CategoryDTO): Promise<Category> {
    if (['', null, undefined].includes(category._id)) {
      delete category['_id'];
      return await this.categoryCreate(category);
    } else {
      return await this.categoryUpdate(category);
    }
  }

  async categoryCreate(createCategoryDto: CategoryDTO): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return await createdCategory.save();
  }

  async categoryUpdate(updateData: CategoryDTO): Promise<Category> {
    const category = await this.categoryModel
      .findByIdAndUpdate(updateData._id, updateData)
      .setOptions({ overwrite: true, new: true });
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async categoryFindAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async categoryFindOne(id: string): Promise<Category> {
    return this.categoryModel.findOne({ _id: id }).exec();
  }

  async categoryDelete(id: string) {
    const category = await this.categoryModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return category;
  }

  // Tags
  async saveTag(tag: TagDTO): Promise<Tag> {
    if (['', null, undefined].includes(tag._id)) {
      delete tag['_id'];
      return await this.tagCreate(tag);
    } else {
      return await this.tagUpdate(tag);
    }
  }

  async tagCreate(createTagDto: TagDTO): Promise<Tag> {
    const tag = new this.tagModel(createTagDto);
    return tag.save();
  }

  async tagUpdate(updateData: TagDTO) {
    const tag = await this.tagModel
      .findByIdAndUpdate(updateData._id, updateData)
      .setOptions({ overwrite: true, new: true });
    if (!tag) {
      throw new NotFoundException();
    }
    return tag;
  }
  async tagFindAll(): Promise<Tag[]> {
    return this.tagModel.find().exec();
  }

  async tagFindOne(id: string): Promise<Tag> {
    return this.tagModel.findOne({ _id: id }).exec();
  }

  async tagDelete(id: string) {
    return await this.tagModel.findByIdAndRemove({ _id: id }).exec();
  }
}
