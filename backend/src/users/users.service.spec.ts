import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

const mockUser = {
  firstName: 'Petros',
  lastName: 'Burrows',
  userName: 'burrowsp',
  password: 'burrowspX',
  email: 'burrowsp@info.xc',
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const usersArray = [
    {
      firstName: 'Petros',
      lastName: 'Burrows',
      userName: 'burrowsp',
      password: 'burrowspX',
      email: 'burrowsp@info.xc',
    },
    {
      firstName: 'Daniel',
      lastName: 'Kiddles',
      userName: 'kiddlesd',
      password: 'kiddlesdY',
      email: 'kiddlesd@info.xc',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(usersArray),
    } as any);
    const users = await service.findAll();
    expect(users).toEqual(usersArray);
  });

  it('should insert a new User', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        firstName: 'Petros',
        lastName: 'Burrows',
        userName: 'burrowsp',
        password: 'burrowspX',
        email: 'burrowsp@info.xc',
      }),
    );
    const newUser = await service.create({
      firstName: 'Petros',
      lastName: 'Burrows',
      userName: 'burrowsp',
      password: 'burrowspX',
      email: 'burrowsp@info.xc',
    });
    expect(newUser).toEqual(mockUser);
  });
});
