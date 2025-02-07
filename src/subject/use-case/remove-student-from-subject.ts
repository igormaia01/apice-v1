import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '@student/student.entity';
import { Subject } from '@subject/subject.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateOverloadByDateAndHours } from '@overload/use-case/update-overload-by-date-and-hours';
import { DateTime } from 'luxon';

export class RemoveStudentFromSubject {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly updateOverload: UpdateOverloadByDateAndHours,
  ) {}

  async execute(studentId: string, subjectId: string): Promise<void> {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: {
        overloads: true,
      },
    });
    const subject = await this.subjectRepository.findOne({
      where: { id: subjectId },
      relations: {
        students: true,
        activities: true,
      },
    });
    if (!student) throw new NotFoundException('Student not found');
    if (!subject) throw new NotFoundException('Subject not found');
    if (!subject.students.some((student) => student.id === studentId))
      throw new NotFoundException('Student not found in subject');

    subject.students = subject.students.filter(
      (student) => student.id !== studentId,
    );

    await this.subjectRepository.save(subject);

    const openActivities = subject.activities.filter(
      (activity) => activity.deadline > new Date(),
    );

    for (const activity of openActivities) {
      const daysDiff = Math.ceil(
        DateTime.fromJSDate(activity.deadline)
          .diff(DateTime.fromJSDate(activity.created_at), 'days')
          .as('days'),
      );
      const daysNotPerformed = Math.ceil(
        DateTime.fromJSDate(activity.deadline)
          .diff(DateTime.now(), 'days')
          .as('days'),
      );

      const hoursPerDayInitially = activity.hours / daysDiff;
      const hoursNotPerformed = daysNotPerformed * hoursPerDayInitially;

      await this.updateOverload.execute(
        activity.deadline,
        -hoursNotPerformed,
        student,
      );
    }
    await this.studentRepository.save(student);
  }
}
