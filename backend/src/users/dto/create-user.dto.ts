import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Mongo ID',
  })
  readonly _id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'First Name',
    example: 'John',
  })
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Ndoe', description: 'Last Name' })
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @ApiProperty({ example: 'ndoej', description: 'User Name' })
  readonly userName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @ApiProperty({ example: 'NJ123@dkl;', description: 'Password' })
  readonly password: string;

  @IsEmail()
  @ApiProperty({ example: 'johnndoe@ndo.inc', description: 'Email Adress' })
  readonly email: string;
}
