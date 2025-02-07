import { Student } from '@student/student.entity';
import { Repository } from 'typeorm';
import { DateTime } from 'luxon';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '@activity/activity.entity';

export class CalculateOverloadWhenRemoveActivityFromSubject {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async execute(activityId: string): Promise<void> {
    const activity = await this.getActivityWithRelations(activityId);

    activity.subject.students.forEach((student) => {
      this.removerOverloadByActivity(activity, student);
    });
    await this.studentRepository.save(activity.subject.students);
  }

  private async getActivityWithRelations(activityId: string) {
    return this.activityRepository.findOneOrFail({
      where: { id: activityId },
      relations: ['subject', 'subject.students', 'subject.students.overloads'],
    });
  }

  removerOverloadByActivity(activity: Activity, student: Student) {
    const activityCreatedAt = DateTime.fromJSDate(activity.created_at);
    const daysDiffFromCreated = Math.ceil(
      DateTime.fromJSDate(activity.deadline)
        .diff(activityCreatedAt, 'days')
        .as('days'),
    );
    console.log('daysDiffFromCreated', daysDiffFromCreated);
    const hoursPerDay = activity.hours / daysDiffFromCreated;

    let referenceDate = DateTime.local();
    console.log('referenceDate', referenceDate);
    const daysDiffFromNow = Math.ceil(
      DateTime.fromJSDate(activity.deadline)
        .diff(referenceDate, 'days')
        .as('days'),
    );

    for (let i = 0; i < daysDiffFromNow; i++) {
      const indexOfOverloadActivityMonth = student.overloads.findIndex(
        (overload) =>
          overload.month === referenceDate.month &&
          overload.year === referenceDate.year,
      );

      student.overloads[indexOfOverloadActivityMonth].days[referenceDate.day] -=
        hoursPerDay;

      student.overloads[indexOfOverloadActivityMonth].days[referenceDate.day] =
        Number(
          student.overloads[indexOfOverloadActivityMonth].days[
            referenceDate.day
          ].toFixed(1),
        );
      referenceDate = referenceDate.plus({ days: 1 });
    }
  }
}
