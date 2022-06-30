import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiBody({
    description: 'Required User Body fields to create a user.',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: User })
  async create(@Body() createCatDto: CreateUserDto) {
    return await this.usersService.saveUser(createCatDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record listing',
    type: User,
  })
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'User delete by id',
    type: User,
  })
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
