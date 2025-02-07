import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '@student/student.entity';
import { studentFixture } from '@student/student-fixture';
import { activityFixture } from '@activity/activity-fixture';
import { subjectFixture } from '@subject/subject-fixture';
import { Activity } from '@activity/activity.entity';

import { overloadFixture } from '../overload-fixture';
import { createMockRepository } from '../../test/mock-repository';

import { CalculateOverloadWhenRemoveActivityFromSubject } from './calculate-when-remove-activity-from-subject';

describe('CalculateOverloadWhenRemoveActivityFromSubject', () => {
  let calculateOverloadWhenRemoveActivityFromSubject: CalculateOverloadWhenRemoveActivityFromSubject;
  const studentRepository = createMockRepository<Student>();
  const activityRepository = createMockRepository<Activity>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalculateOverloadWhenRemoveActivityFromSubject,
        {
          provide: getRepositoryToken(Student),
          useValue: studentRepository,
        },
        {
          provide: getRepositoryToken(Activity),
          useValue: activityRepository,
        },
      ],
    }).compile();

    calculateOverloadWhenRemoveActivityFromSubject =
      module.get<CalculateOverloadWhenRemoveActivityFromSubject>(
        CalculateOverloadWhenRemoveActivityFromSubject,
      );
  });

  it('should calculate overload when add a student in a subject when 3 activities has 10 days to reach deadline', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-04-27'));
    const todayPlus10Days = new Date();

    const student = studentFixture();
    student.overloads = overloadFixture(student);
    const subject = subjectFixture();
    subject.students = [student];

    todayPlus10Days.setDate(todayPlus10Days.getDate() + 10);
    const activity = activityFixture({ deadline: todayPlus10Days, subject });

    const findOneOrFailSubjectSpy = jest
      .spyOn(activityRepository, 'findOneOrFail')
      .mockResolvedValue(activity);
    const saveSpy = jest.spyOn(studentRepository, 'save');

    await calculateOverloadWhenRemoveActivityFromSubject.execute(activity.id);

    expect(findOneOrFailSubjectSpy).toHaveBeenCalledWith({
      where: { id: activity.id },
      relations: ['subject', 'subject.students', 'subject.students.overloads'],
    });

    expect(saveSpy).toHaveBeenCalledWith(activity.subject.students);
  });
});
