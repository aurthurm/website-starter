import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type ServiceDocument = Service & Document;

@Schema()
export class Service {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  title: string;

  @Prop()
  content: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
