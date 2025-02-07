import { Student } from '@student/student.entity';
import { Subject } from '@subject/subject.entity';
import { Repository } from 'typeorm';
import { DateTime } from 'luxon';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateOverloadForAllYear } from './create-overload-for-all-year';
import { UpdateOverloadByDateAndHours } from './update-overload-by-date-and-hours';

export class CalculateOverloadWhenAddStudentInSubject {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly createOverloadForAllYear: CreateOverloadForAllYear,
    private readonly updateOverload: UpdateOverloadByDateAndHours,
  ) {}

  async execute(studentId: string, subjectId: string): Promise<void> {
    const student = await this.studentRepository.findOneOrFail({
      where: { id: studentId },
      relations: ['overloads'],
    });
    const subject = await this.subjectRepository.findOneOrFail({
      where: { id: subjectId },
      relations: ['activities'],
    });
    const now = DateTime.now();
    if (!student.overloads.some((overload) => overload.year === now.year)) {
      const result = await this.createOverloadForAllYear.execute(student);
      student.overloads.push(...result);
    }
    const activitiesOpen = subject.activities.filter(
      (activity) => activity.deadline > now.toJSDate(),
    );

    activitiesOpen.forEach((activity) => {
      this.updateOverload.execute(activity.deadline, activity.hours, student);
    });
    await this.studentRepository.save(student);
  }
}
