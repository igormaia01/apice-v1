import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '@student/student.entity';
import { DateTime } from 'luxon';

import { Overload } from '../overload.entity';

export class CreateOverloadForAllYear {
  constructor(
    @InjectRepository(Overload)
    private overloadRepository: Repository<Overload>,
  ) {}

  async execute(student: Student): Promise<Overload[]> {
    const year = DateTime.now().year;
    const overloadsPromise: Promise<Overload>[] = [];
    for (let month = 1; month <= 12; month++) {
      let daysInMonth = DateTime.local(year, month).daysInMonth;
      if (daysInMonth) {
        daysInMonth++;
      }
      const overload = this.overloadRepository.save({
        days: new Array(daysInMonth).fill(0),
        month: month,
        year: year,
        student: student,
      });
      overloadsPromise.push(overload);
    }
    return await Promise.all(overloadsPromise);
  }
}
