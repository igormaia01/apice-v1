import { Student } from '@student/student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '@activity/activity.entity';

import { UpdateOverloadByDateAndHours } from './update-overload-by-date-and-hours';

export class CalculateOverloadWhenUpdateActivityHours {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    private readonly updateOverload: UpdateOverloadByDateAndHours,
  ) {}

  async execute(
    activityId: string,
    oldHours: number,
    newHours: number,
  ): Promise<void> {
    const activity = await this.getActivityWithRelations(activityId);

    const updatedHour = newHours - oldHours;

    activity.subject.students.forEach((student) => {
      this.updateOverload.execute(activity.deadline, updatedHour, student);
    });
    await this.studentRepository.save(activity.subject.students);
  }

  private async getActivityWithRelations(activityId: string) {
    return this.activityRepository.findOneOrFail({
      where: { id: activityId },
      relations: ['subject', 'subject.students', 'subject.students.overloads'],
    });
  }
}
