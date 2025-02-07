import { Test, TestingModule } from '@nestjs/testing';
import { studentFixture } from '@student/student-fixture';
import { activityFixture } from '@activity/activity-fixture';

import { overloadFixture } from '../overload-fixture';

import { UpdateOverloadByDateAndHours } from './update-overload-by-date-and-hours';

describe('UpdateOverloadByDateAndHours', () => {
  let addOverloadInStudentByActivity: UpdateOverloadByDateAndHours;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateOverloadByDateAndHours],
    }).compile();

    addOverloadInStudentByActivity = module.get<UpdateOverloadByDateAndHours>(
      UpdateOverloadByDateAndHours,
    );
  });

  it('should calculate overload when add a activity in a subject', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-04-27T05:00:00Z'));
    const todayPlus10Days = new Date();
    todayPlus10Days.setDate(todayPlus10Days.getDate() + 10);

    const student = studentFixture();
    student.overloads = overloadFixture(student);
    const activity = activityFixture({ deadline: todayPlus10Days, hours: 10 });
    addOverloadInStudentByActivity.execute(
      activity.deadline,
      activity.hours,
      student,
    );
    expect(student.overloads[3].days[26]).toBe(0);
    expect(student.overloads[3].days[28]).toBe(1);
    expect(student.overloads[3].days[28]).toBe(1);
    expect(student.overloads[3].days[29]).toBe(1);
    expect(student.overloads[3].days[30]).toBe(1);
    expect(student.overloads[4].days[1]).toBe(1);
    expect(student.overloads[4].days[2]).toBe(1);
    expect(student.overloads[4].days[3]).toBe(1);
    expect(student.overloads[4].days[4]).toBe(1);
    expect(student.overloads[4].days[5]).toBe(1);
    expect(student.overloads[4].days[6]).toBe(1);
    expect(student.overloads[4].days[7]).toBe(0);
  });
});
