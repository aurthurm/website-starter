import { Transform, Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Category } from 'src/divisions/schemas/category.schema';
import { Department } from 'src/departments/schemas/department.schema';
import { Tag } from 'src/divisions/schemas/tag.schema';
import { User } from 'src/users/schemas/user.schema';

import { ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Status } from '../../articles/articles.constants';

export type ArticleDocument = Article & Document;

@Schema({
  timestamps: true,
})
export class Article {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ index: true, unique: true })
  title: string;

  @Prop({ unique: true })
  slug: string;

  @Prop({
    index: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Tag.name }],
  })
  @Type(() => Tag)
  tags: Tag;

  @Prop({
    index: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
  })
  @Type(() => Category)
  category: Category;

  @Prop({
    index: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Department.name,
  })
  @Type(() => Department)
  department: Department;

  @Prop({ index: true })
  status: Status;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  author: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  publisher: User;

  @Prop({ type: mongoose.Schema.Types.Date })
  publishedAt: Date;

  @Prop()
  featuredImage: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
