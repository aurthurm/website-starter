import { IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Tag } from 'src/divisions/schemas/tag.schema';
import { Category } from 'src/divisions/schemas/category.schema';
import { Department } from 'src/departments/schemas/department.schema';
import { Status } from '../articles.constants';
import { User } from 'src/users/schemas/user.schema';
import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class ArticleDto {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Article title' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Article Tags' })
  tags: Tag;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Article categories' })
  category: Category;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Article department it belongs to' })
  department: Department;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Article status | publushed/draft/review' })
  status: Status;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Article' })
  content: string;

  @IsString()
  @ApiProperty({ description: 'Article author' })
  @Type(() => User)
  author: User;

  @IsString()
  @ApiProperty({ description: 'Article publisher' })
  @Type(() => User)
  publisher: User;

  @IsString()
  @ApiProperty({ description: 'Article pdate published' })
  publishedAt: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Article featured image' })
  featuredImage: string;
}

export class UpdateArticleDto extends PartialType(ArticleDto) {}

export class ArticleFilter {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Article title' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Article Tags' })
  tags: string[];

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Article Category it belongs to' })
  category: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Article department it belongs to' })
  department: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Article status | publushed/draft/review' })
  status: string;
}
