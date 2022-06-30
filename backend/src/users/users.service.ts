import { Model } from 'mongoose';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from './users.role';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async saveUser(userDTO: CreateUserDto): Promise<User> {
    if (['', null, undefined].includes(userDTO._id)) {
      return await this.create(userDTO);
    } else {
      return this.update(userDTO);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    createdUser.password = await bcrypt.hash(
      createdUser.password,
      saltOrRounds,
    );
    createdUser.role = Role.Contributor;
    return await createdUser.save();
  }

  async update(userDTO: CreateUserDto): Promise<User> {
    const update = { ...userDTO };
    if (update['password']) {
      update['password'] = await bcrypt.hash(update['password'], saltOrRounds);
    }
    const user = await this.userModel
      .findByIdAndUpdate(userDTO._id, update)
      .setOptions({ overwrite: true, new: true });

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  async findOneByUserName(username: string): Promise<User> {
    return await this.userModel.findOne({ userName: username }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
