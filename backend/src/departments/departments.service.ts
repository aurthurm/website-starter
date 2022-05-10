import { Model } from 'mongoose';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Department, DepartmentDocument } from './schemas/department.schema';
import { DepartmentDTO } from '../departments/dto/department.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DepartmentsService {
  private readonly logger = new Logger(DepartmentsService.name);

  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
  ) {}

  async saveDepartment(department: DepartmentDTO): Promise<Department> {
    if (['', null, undefined].includes(department._id)) {
      delete department['_id'];
      return await this.departmentCreate(department);
    } else {
      return await this.departmentUpdate(department);
    }
  }

  async departmentCreate(department: DepartmentDTO): Promise<Department> {
    const instance = new this.departmentModel(department);
    return await instance.save();
  }

  async departmentUpdate(updateData: DepartmentDTO) {
    const article = await this.departmentModel
      .findByIdAndUpdate(updateData._id, updateData)
      .setOptions({ overwrite: true, new: true });
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }

  async departmentFindAll(): Promise<Department[]> {
    return this.departmentModel.find().exec();
  }

  async departmentFindOne(title: string): Promise<Department> {
    return this.departmentModel.findOne({ title }).exec();
  }

  async departmentDelete(id: string) {
    const deletedCat = await this.departmentModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
