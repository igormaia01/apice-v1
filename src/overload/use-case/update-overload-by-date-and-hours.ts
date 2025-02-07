import { Student } from '@student/student.entity';
import { DateTime } from 'luxon';

export class UpdateOverloadByDateAndHours {
  async execute(activityDeadline: Date, hours: number, student: Student) {
    const now = DateTime.now();
    let referenceDate = DateTime.now();

    const daysDiff = Math.floor(
      DateTime.fromJSDate(activityDeadline).diff(now, 'days').as('days'),
    );

    const hoursPerDay = hours / daysDiff;

    for (let i = 0; i < daysDiff; i++) {
      const indexOfOverloadActivityMonth = student.overloads.findIndex(
        (overload) =>
          overload.month === referenceDate.month &&
          overload.year === referenceDate.year,
      );

      student.overloads[indexOfOverloadActivityMonth].days[referenceDate.day] +=
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
