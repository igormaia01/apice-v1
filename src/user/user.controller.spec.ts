import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { createMockRepository } from '../test/mock-repository';

import { UserController } from './user.controller';
import { CreateAccess } from './usecase/create';
import { User } from './user.entity';
import { Authenticate } from './usecase/authenticate';

describe('UserController', () => {
  let controller: UserController;
  const userRepository = createMockRepository<User>();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        CreateAccess,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
        Authenticate,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
