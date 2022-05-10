import { Model } from 'mongoose';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Service, ServiceDocument } from './schemas/service.schema';
import { ServiceDto } from '../services/dto/service.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ServicesService {
  private readonly logger = new Logger(ServicesService.name);

  constructor(
    @InjectModel(Service.name)
    private serviceModel: Model<ServiceDocument>,
  ) {}

  async saveService(service: ServiceDto): Promise<Service> {
    if (['', null, undefined].includes(service._id)) {
      delete service['_id'];
      return await this.serviceCreate(service);
    } else {
      return await this.serviceUpdate(service);
    }
  }

  async serviceCreate(service: ServiceDto): Promise<Service> {
    const instance = new this.serviceModel(service);
    return await instance.save();
  }

  async serviceUpdate(updateData: ServiceDto) {
    const article = await this.serviceModel
      .findByIdAndUpdate(updateData._id, updateData)
      .setOptions({ overwrite: true, new: true });
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }
  async serviceFindAll(): Promise<Service[]> {
    return this.serviceModel.find().exec();
  }

  async serviceFindOne(title: string): Promise<Service> {
    return this.serviceModel.findOne({ title }).exec();
  }

  async serviceDelete(id: string) {
    const deletedCat = await this.serviceModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
