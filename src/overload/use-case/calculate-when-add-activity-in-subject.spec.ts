import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '@student/student.entity';
import { studentFixture } from '@student/student-fixture';
import { activityFixture } from '@activity/activity-fixture';
import { subjectFixture } from '@subject/subject-fixture';
import { Activity } from '@activity/activity.entity';

import { overloadFixture } from '../overload-fixture';
import { createMockRepository } from '../../test/mock-repository';

import { CreateOverloadForAllYear } from './create-overload-for-all-year';
import { CalculateOverloadWhenAddActivityInSubject } from './calculate-when-add-activity-in-subject';
import { UpdateOverloadByDateAndHours } from './update-overload-by-date-and-hours';

describe('CalculateOverloadWhenAddActivityInSubject', () => {
  let calculateOverloadWhenAddActivityInSubject: CalculateOverloadWhenAddActivityInSubject;
  const studentRepository = createMockRepository<Student>();
  const activityRepository = createMockRepository<Activity>();
  const createOverloadForAllYear = { execute: jest.fn() };
  const addOverload = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalculateOverloadWhenAddActivityInSubject,
        {
          provide: getRepositoryToken(Student),
          useValue: studentRepository,
        },
        {
          provide: getRepositoryToken(Activity),
          useValue: activityRepository,
        },
        {
          provide: CreateOverloadForAllYear,
          useValue: createOverloadForAllYear,
        },
        {
          provide: UpdateOverloadByDateAndHours,
          useValue: addOverload,
        },
      ],
    }).compile();

    calculateOverloadWhenAddActivityInSubject =
      module.get<CalculateOverloadWhenAddActivityInSubject>(
        CalculateOverloadWhenAddActivityInSubject,
      );
  });

  it('should calculate overload when add a activity in a subject', async () => {
    const student = studentFixture();
    const student2 = studentFixture();
    const student3 = studentFixture();

    student.overloads = overloadFixture(student);
    student2.overloads = overloadFixture(student2);
    const subject = subjectFixture({ students: [student, student2, student3] });
    const activity = activityFixture({ subject });

    jest
      .spyOn(activityRepository, 'findOneOrFail')
      .mockImplementation(() => Promise.resolve(activity));
    jest
      .spyOn(createOverloadForAllYear, 'execute')
      .mockResolvedValue(overloadFixture(student3));
    const saveSpy = jest.spyOn(studentRepository, 'save');

    await calculateOverloadWhenAddActivityInSubject.execute(activity.id);

    expect(activityRepository.findOneOrFail).toHaveBeenCalledWith({
      where: { id: activity.id },
      relations: ['subject', 'subject.students', 'subject.students.overloads'],
    });
    expect(createOverloadForAllYear.execute).toHaveBeenCalledWith(student3);
    expect(addOverload.execute).toHaveBeenCalledWith(
      activity.deadline,
      activity.hours,
      student,
    );
    expect(addOverload.execute).toHaveBeenCalledWith(
      activity.deadline,
      activity.hours,
      student2,
    );
    expect(addOverload.execute).toHaveBeenCalledWith(
      activity.deadline,
      activity.hours,
      student3,
    );
    expect(saveSpy).toHaveBeenCalledWith(activity.subject.students);
  });
});
