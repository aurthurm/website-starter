import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('Users Controller', () => {
  let controller: UsersController;
  let service: UsersService;
  const createUserDto: CreateUserDto = {
    firstName: 'Petros',
    lastName: 'Burrows',
    userName: 'burrowsp',
    password: 'burrowspX',
    email: 'burrowsp@info.xc',
  };

  const mockUser = {
    firstName: 'Petros',
    lastName: 'Burrows',
    userName: 'burrowsp',
    password: 'burrowspX',
    email: 'burrowsp@info.xc',
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
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
              {
                firstName: 'Samantha',
                lastName: 'Sparrows',
                userName: 'sparrow123',
                password: 'sparrow123645',
                email: 'sparrow123@info.xc',
              },
            ]),
            create: jest.fn().mockResolvedValue(createUserDto),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('create()', () => {
    it('should create a new user', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockUser);

      await controller.create(createUserDto);
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      expect(controller.findAll()).resolves.toEqual([
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
        {
          firstName: 'Samantha',
          lastName: 'Sparrows',
          userName: 'sparrow123',
          password: 'sparrow123645',
          email: 'sparrow123@info.xc',
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
