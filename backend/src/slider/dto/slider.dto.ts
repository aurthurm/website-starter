import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SliderDto {
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

export class UpdateSliderDto extends PartialType(SliderDto) {}
