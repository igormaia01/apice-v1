import { Controller, Get, Param, Query } from '@nestjs/common';

import { GetOverloadByStudent } from './use-case/get-overload-by-student';
import { GetOverloadDetailByDay } from './use-case/get-overloead-detail-by-day';

@Controller('overload')
export class OverloadController {
  constructor(
    private readonly getOverloadByStudent: GetOverloadByStudent,
    private readonly getOverloadDetailByDay: GetOverloadDetailByDay,
  ) {}

  @Get(':studentId')
  findOne(@Param('studentId') studentId: string) {
    return this.getOverloadByStudent.execute(studentId);
  }

  @Get('/day-detail/:studentId')
  detailByDay(
    @Param('studentId') studentId: string,
    @Query('date') date: string,
  ) {
    return this.getOverloadDetailByDay.execute(studentId, date);
  }
}
