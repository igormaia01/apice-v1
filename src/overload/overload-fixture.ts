import { DateTime } from 'luxon';
import { faker } from '@faker-js/faker';
import { Student } from '@student/student.entity';

import { Overload } from './overload.entity';

export function overloadFixture(student: Student): Overload[] {
  const overloads: Overload[] = [];
  const year = DateTime.now().year;
  for (let month = 1; month <= 12; month++) {
    let daysInMonth = DateTime.local(year, month).daysInMonth;
    if (daysInMonth) {
      daysInMonth++;
    }
    overloads.push({
      days: new Array(daysInMonth).fill(0),
      month: month,
      year: year,
      id: faker.string.uuid(),
      student: student,
      studentId: student.id,
    });
  }
  return overloads;
}
