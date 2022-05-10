import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type DepartmentDocument = Department & Document;

@Schema()
export class Department {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  title: string;

  @Prop()
  content: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
