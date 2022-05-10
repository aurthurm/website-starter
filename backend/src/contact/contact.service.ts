import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { ContactDto, ContactFilter } from '../contact/dto/contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pagination, PaginationOptionsInterface } from 'src/utils/paginate';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    @InjectModel(Contact.name)
    private contactModel: Model<ContactDocument>,
  ) {}

  async contactCreate(contact: ContactDto): Promise<Contact> {
    delete contact['_id'];
    const instance = new this.contactModel({
      ...contact,
      opened: true,
      dateOpened: undefined,
    });
    return await instance.save();
  }

  async paginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Contact>> {
    const page = +options.page + 1;
    const results = await this.contactModel
      .find({})
      .limit(options.limit)
      .skip(options.limit * (page - 1));
    const count = await this.contactModel.countDocuments();
    return new Pagination<Contact>({
      results,
      total: count,
      total_pages: Math.ceil(count / results.length),
      currentPage: page,
    });
  }

  async contactFindAll(): Promise<Contact[]> {
    return this.contactModel.find().exec();
  }

  async filterContacts(filters: ContactFilter): Promise<Contact[]> {
    const params = {};
    if (filters.firstName) {
      params['firstName'] = { $regex: new RegExp(filters.firstName, 'i') };
    }
    if (filters.lastName) {
      params['lastName'] = filters.lastName;
    }
    if (filters.subject) {
      params['subject'] = filters.subject;
    }
    if (filters.email) {
      params['email'] = filters.email;
    }
    if (filters.opened) {
      params['opened'] = filters.opened;
    }
    console.log(params);
    return await this.contactModel.find(params);
  }

  async contactFindOne(title: string): Promise<Contact> {
    return this.contactModel.findOne({ title }).exec();
  }

  async contactDelete(id: string) {
    const deletedCat = await this.contactModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
