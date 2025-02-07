import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '@student/student.entity';
import { DateTime } from 'luxon';

export type OverloadDetail = {
  subject: string;
  activity: string;
  overload_this_day: number;
  teacher_name: string;
};

export class GetOverloadDetailByDay {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async execute(studentId: string, date: string): Promise<OverloadDetail[]> {
    const student = await this.studentRepository.findOneOrFail({
      where: {
        id: studentId,
      },
      relations: ['subjects.activities.subject.teacher'],
    });

    const allActivitiesInDate = student?.subjects?.reduce((acc, subject) => {
      const activitiesInDate = subject.activities.filter(
        (activity) =>
          DateTime.fromISO(date) >=
            DateTime.fromJSDate(activity.created_at).startOf('day') &&
          DateTime.fromISO(date) <=
            DateTime.fromJSDate(activity.deadline).endOf('day'),
      );

      return [...acc, ...activitiesInDate];
    }, []);

    if (!allActivitiesInDate) {
      return [];
    }

    return allActivitiesInDate.map<OverloadDetail>((activity) => {
      const daysDiff = Math.floor(
        DateTime.fromJSDate(activity.deadline)
          .diff(DateTime.fromJSDate(activity.created_at), 'days')
          .as('days'),
      );
      const hoursPerDay = activity.hours / daysDiff;

      return {
        subject: activity?.subject?.name,
        activity: activity.title,
        overload_this_day: hoursPerDay,
        teacher_name: activity?.subject?.teacher?.name,
      };
    });
  }
}
