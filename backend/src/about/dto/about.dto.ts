import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AboutDto {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Department name',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Article' })
  content: string;
}
