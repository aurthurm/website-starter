import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class TagDTO {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tag name',
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Tag Description',
  })
  content?: string;
}

export class UpdateTagDTO extends PartialType(TagDTO) {}
