import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../users.role';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  @ApiProperty({ example: 'John', description: 'First Name' })
  firstName: string;

  @Prop()
  @ApiProperty({ example: 'Ndoe', description: 'Last Name' })
  lastName: string;

  @Prop({ unique: true })
  @ApiProperty({ example: 'ndoej', description: 'User Name' })
  userName: string;

  @Prop()
  @ApiProperty({ example: 'NJ123@dkl;', description: 'Password' })
  @Exclude()
  password: string;

  @Prop({ unique: true })
  @ApiProperty({ example: 'johnndoe@ndo.inc', description: 'Email Adress' })
  email: string;

  @Prop()
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
