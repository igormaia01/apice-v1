import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '@student/student.entity';
import { DateTime } from 'luxon';

import { Overload } from '../overload.entity';
import { createMockRepository } from '../../test/mock-repository';

import { CreateOverloadForAllYear } from './create-overload-for-all-year';

describe('CreateOverloadForAllYear', () => {
  let createOverloadForAllYear: CreateOverloadForAllYear;
  const overloadRepository = createMockRepository<Overload>();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOverloadForAllYear,
        {
          provide: getRepositoryToken(Overload),
          useValue: overloadRepository,
        },
      ],
    }).compile();

    createOverloadForAllYear = module.get<CreateOverloadForAllYear>(
      CreateOverloadForAllYear,
    );
  });

  it('should create all overloads for actual year for a student', async () => {
    const student = new Student();
    const saveSpy = jest
      .spyOn(overloadRepository, 'save')
      .mockImplementation((overload) => Promise.resolve(overload as Overload));

    const overloads = await createOverloadForAllYear.execute(student);

    const currentYear = DateTime.now().year;
    expect(overloads).toHaveLength(12);
    overloads.forEach((overload, index) => {
      expect(overload).toEqual({
        days: expect.any(Array),
        month: index + 1,
        year: currentYear,
        student: student,
      });
    });

    expect(saveSpy).toHaveBeenCalledTimes(12);
  });
});
