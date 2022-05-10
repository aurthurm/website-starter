import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ContactDto {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'firstName',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'lastName' })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'subject' })
  subject: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'message body' })
  message: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'opened or is read' })
  opened: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'dateOpened' })
  dateOpened: string;
}

export class ContactFilter {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Contacters first name' })
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Contacters last name' })
  lastName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Contacters subject message' })
  subject: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Contacters email' })
  email: string;

  @IsOptional()
  @ApiProperty({ description: 'Contact Message read or not' })
  opened: boolean;
}
