import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type SliderDocument = Slider & Document;

@Schema()
export class Slider {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  featuredImage: string;
}

export const SliderSchema = SchemaFactory.createForClass(Slider);
