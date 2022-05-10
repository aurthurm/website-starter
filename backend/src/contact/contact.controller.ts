import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Pagination } from 'src/utils/paginate';
import { ContactService } from './contact.service';
import { ContactDto, ContactFilter } from './dto/contact.dto';
import { Contact } from './schemas/contact.schema';

@ApiBearerAuth()
@Controller('contact')
@ApiTags('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('')
  @ApiOperation({ summary: 'Add Contact Mesage' })
  @ApiBody({
    description: 'Required Contact Body fields to create a Contact.',
    type: ContactDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: Contact })
  async createContact(@Body() createDto: ContactDto) {
    return await this.contactService.contactCreate(createDto);
  }

  @Get('/paginated')
  async paginated(@Request() request): Promise<Pagination<Contact>> {
    return await this.contactService.paginate({
      limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
      page: request.query.hasOwnProperty('page') ? request.query.page : 0,
    });
  }

  @Get('filter')
  @ApiResponse({
    status: 200,
    description: 'Contac Messages have been successfully fetched',
    type: Contact,
  })
  filterArticles(@Query() filters: ContactFilter) {
    return this.contactService.filterContacts(filters);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Contact message delete by id',
    type: Contact,
  })
  async contactDelete(@Param('id') id: string) {
    return this.contactService.contactDelete(id);
  }
}
