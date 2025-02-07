import { Student } from '@student/student.entity';
import { Repository } from 'typeorm';
import { DateTime } from 'luxon';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '@activity/activity.entity';

import { CreateOverloadForAllYear } from './create-overload-for-all-year';
import { UpdateOverloadByDateAndHours } from './update-overload-by-date-and-hours';

export class CalculateOverloadWhenAddActivityInSubject {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    private readonly createOverloadForAllYear: CreateOverloadForAllYear,
    private readonly updateOverload: UpdateOverloadByDateAndHours,
  ) {}

  async execute(activityId: string): Promise<void> {
    const activity = await this.getActivityWithRelations(activityId);
    await this.createOverloadsForStudents(activity);
    activity.subject.students.forEach((student) => {
      this.updateOverload.execute(activity.deadline, activity.hours, student);
    });
    await this.studentRepository.save(activity.subject.students);
  }

  private async getActivityWithRelations(activityId: string) {
    return this.activityRepository.findOneOrFail({
      where: { id: activityId },
      relations: ['subject', 'subject.students', 'subject.students.overloads'],
    });
  }

  private async createOverloadsForStudents(activity: Activity) {
    const now = DateTime.now();
    await Promise.all(
      activity.subject.students.map(async (student) => {
        if (!student.overloads.some((overload) => overload.year === now.year)) {
          student.overloads.push(
            ...(await this.createOverloadForAllYear.execute(student)),
          );
        }
      }),
    );
  }
}
