import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class DepartmentDTO {
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

export class UpdateDepartmentDTO extends PartialType(DepartmentDTO) {}
