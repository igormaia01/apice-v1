import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '@subject/subject.entity';
import { Student } from '@student/student.entity';
import { Teacher } from '@teacher/teacher.entity';
import { Activity } from '@activity/activity.entity';

import { Overload } from './overload.entity';
import { OverloadController } from './overload.controller';
import { CalculateOverloadWhenAddStudentInSubject } from './use-case/calculate-when-add-student-in-subject';
import { CreateOverloadForAllYear } from './use-case/create-overload-for-all-year';
import { CalculateOverloadWhenAddActivityInSubject } from './use-case/calculate-when-add-activity-in-subject';
import { UpdateOverloadByDateAndHours } from './use-case/update-overload-by-date-and-hours';
import { CalculateOverloadWhenRemoveActivityFromSubject } from './use-case/calculate-when-remove-activity-from-subject';
import { CalculateOverloadWhenUpdateActivityHours } from './use-case/calculate-overload-when-update-activity-hours';
import { GetOverloadByStudent } from './use-case/get-overload-by-student';
import { GetOverloadDetailByDay } from './use-case/get-overloead-detail-by-day';

@Module({
  imports: [
    TypeOrmModule.forFeature([Overload]),
    TypeOrmModule.forFeature([Subject]),
    TypeOrmModule.forFeature([Student]),
    TypeOrmModule.forFeature([Teacher]),
    TypeOrmModule.forFeature([Activity]),
  ],
  controllers: [OverloadController],
  providers: [
    CalculateOverloadWhenAddStudentInSubject,
    CreateOverloadForAllYear,
    CalculateOverloadWhenAddActivityInSubject,
    UpdateOverloadByDateAndHours,
    CalculateOverloadWhenRemoveActivityFromSubject,
    CalculateOverloadWhenUpdateActivityHours,
    GetOverloadByStudent,
    GetOverloadDetailByDay,
  ],
  exports: [
    CalculateOverloadWhenAddStudentInSubject,
    CreateOverloadForAllYear,
    CalculateOverloadWhenAddActivityInSubject,
    UpdateOverloadByDateAndHours,
    CalculateOverloadWhenRemoveActivityFromSubject,
    CalculateOverloadWhenUpdateActivityHours,
    GetOverloadByStudent,
    GetOverloadDetailByDay,
  ],
})
export class OverloadModule {}
