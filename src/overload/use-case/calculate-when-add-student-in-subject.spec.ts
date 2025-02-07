import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Subject } from '@subject/subject.entity';
import { Student } from '@student/student.entity';
import { studentFixture } from '@student/student-fixture';
import { activityFixture } from '@activity/activity-fixture';
import { subjectFixture } from '@subject/subject-fixture';

import { overloadFixture } from '../overload-fixture';
import { createMockRepository } from '../../test/mock-repository';
import { Overload } from '../overload.entity';

import { CreateOverloadForAllYear } from './create-overload-for-all-year';
import { CalculateOverloadWhenAddStudentInSubject } from './calculate-when-add-student-in-subject';
import { UpdateOverloadByDateAndHours } from './update-overload-by-date-and-hours';

describe('CreateOverloadForAllYear', () => {
  let calculateOverloadWhenAddStudentInSubject: CalculateOverloadWhenAddStudentInSubject;
  const studentRepository = createMockRepository<Student>();
  const subjectRepository = createMockRepository<Subject>();
  const overloadRepository = createMockRepository<Overload>();
  const addOverload = {
    execute: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalculateOverloadWhenAddStudentInSubject,
        {
          provide: getRepositoryToken(Student),
          useValue: studentRepository,
        },
        {
          provide: getRepositoryToken(Subject),
          useValue: subjectRepository,
        },
        {
          provide: getRepositoryToken(Overload),
          useValue: overloadRepository,
        },
        {
          provide: CreateOverloadForAllYear,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateOverloadByDateAndHours,
          useValue: addOverload,
        },
      ],
    }).compile();

    calculateOverloadWhenAddStudentInSubject =
      module.get<CalculateOverloadWhenAddStudentInSubject>(
        CalculateOverloadWhenAddStudentInSubject,
      );
  });

  it('should calculate overload when add a student in a subject when 3 activities has 10 days to reach deadline', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-04-27'));
    const todayPlus10Days = new Date();
    todayPlus10Days.setDate(todayPlus10Days.getDate() + 10);
    const activities = [
      activityFixture({ deadline: todayPlus10Days }),
      activityFixture({ deadline: todayPlus10Days }),
      activityFixture({ deadline: todayPlus10Days }),
    ];
    const student = studentFixture();
    student.overloads = overloadFixture(student);
    const subject = subjectFixture({ activities });

    const findOneOrFailStudentSpy = jest
      .spyOn(studentRepository, 'findOneOrFail')
      .mockImplementation(() => Promise.resolve({ ...student }));
    const findOneOrFailSubjectSpy = jest
      .spyOn(subjectRepository, 'findOneOrFail')
      .mockImplementation(() => Promise.resolve({ ...subject }));
    const saveSpy = jest.spyOn(studentRepository, 'save');

    await calculateOverloadWhenAddStudentInSubject.execute(
      student.id,
      subject.id,
    );

    expect(findOneOrFailStudentSpy).toHaveBeenCalledWith({
      where: { id: student.id },
      relations: ['overloads'],
    });
    expect(findOneOrFailSubjectSpy).toHaveBeenCalledWith({
      where: { id: subject.id },
      relations: ['activities'],
    });
    expect(addOverload.execute).toHaveBeenCalledTimes(3);
    expect(saveSpy).toHaveBeenCalledWith(student);
  });
});
