import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { studentFixture } from '@student/student-fixture';

import { createMockRepository } from '../../test/mock-repository';
import { Overload } from '../overload.entity';
import { overloadFixture } from '../overload-fixture';

import { GetOverloadByStudent } from './get-overload-by-student';

describe('GetOverloadByStudent', () => {
  let getOverloadByStudent: GetOverloadByStudent;
  const overloadRepository = createMockRepository<Overload>();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetOverloadByStudent,
        {
          provide: getRepositoryToken(Overload),
          useValue: overloadRepository,
        },
      ],
    }).compile();

    getOverloadByStudent =
      module.get<GetOverloadByStudent>(GetOverloadByStudent);
  });

  it('should call overload repository with correct values and return the data', async () => {
    const studentId = '123';
    const year = new Date().getFullYear();
    const student = studentFixture();
    const overloads = overloadFixture(student);
    jest.spyOn(overloadRepository, 'find').mockResolvedValue(overloads);

    const result = await getOverloadByStudent.execute(studentId);

    expect(overloadRepository.find).toHaveBeenCalledWith({
      where: {
        studentId,
        year,
      },
      order: {
        month: 'ASC',
      },
    });
    expect(result).toEqual(overloads);
  });
});
