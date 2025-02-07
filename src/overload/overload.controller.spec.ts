import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { createMockRepository } from '../test/mock-repository';

import { OverloadController } from './overload.controller';
import { GetOverloadByStudent } from './use-case/get-overload-by-student';
import { Overload } from './overload.entity';

describe('OverloadController', () => {
  let controller: OverloadController;

  const overloadRepository = createMockRepository<Overload>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OverloadController],
      providers: [
        GetOverloadByStudent,
        {
          provide: getRepositoryToken(Overload),
          useValue: overloadRepository,
        },
      ],
    }).compile();

    controller = module.get<OverloadController>(OverloadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
