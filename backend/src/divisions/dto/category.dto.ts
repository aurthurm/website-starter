import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CategoryDTO {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Category name',
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Category Description',
  })
  content?: string;
}

export class UpdateCategoryDTO extends PartialType(CategoryDTO) {}
