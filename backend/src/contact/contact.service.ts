import { Model } from 'mongoose';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
      opened: false,
      dateOpened: undefined,
    });
    return await instance.save();
  }

  async markAsRead(id: string): Promise<Contact> {
    const contact = await this.contactModel
      .findByIdAndUpdate(id, {
        opened: true,
        dateOpened: new Date().toISOString(),
      })
      .setOptions({ new: true });

    if (!contact) {
      throw new NotFoundException();
    }

    return contact;
  }

  async paginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Contact>> {
    const page = +options.page + 1;
    const results = await this.contactModel
      .find({})
      .sort([['createdAt', 'descending']])
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
    const params = [];
    if (filters.firstName) {
      params.push({
        firstName: { $regex: new RegExp(filters.firstName, 'i') },
      });
    }
    if (filters.lastName) {
      params.push({
        lastName: { $regex: new RegExp(filters.lastName, 'i') },
      });
    }
    if (filters.subject) {
      params.push({ subject: { $regex: new RegExp(filters.subject, 'i') } });
    }
    if (filters.email) {
      params.push({
        email: { $regex: new RegExp(filters.email, 'i') },
      });
    }
    if (filters.opened) {
      params.push({
        opened: filters.opened,
      });
    }
    console.log(params);
    return await this.contactModel
      .find({ $or: params })
      .sort([['createdAt', 'descending']]);
  }

  async contactFindOne(title: string): Promise<Contact> {
    return this.contactModel.findOne({ title }).exec();
  }

  async findOne(id: string): Promise<Contact | null> {
    return this.contactModel.findOne({ _id: id });
  }

  async contactDelete(id: string) {
    const deletedCat = await this.contactModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
