import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '@subject/subject.entity';
import { SubjectController } from '@subject/subject.controller';
import { Student } from '@student/student.entity';
import { AddStudentInSubject } from '@subject/use-case/add-student-in-subject';
import { Teacher } from '@teacher/teacher.entity';
import { CreateSubject } from '@subject/use-case/create-subject';
import { OverloadModule } from '@overload/overload.module';

import { UpdateSubject } from './use-case/update-subject';
import { GetAllSubject } from './use-case/get-all-subject';
import { GetSubjectById } from './use-case/get-subject-by-id';
import { DeleteSubject } from './use-case/delete-subject';
import { RemoveStudentFromSubject } from './use-case/remove-student-from-subject';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subject]),
    TypeOrmModule.forFeature([Student]),
    TypeOrmModule.forFeature([Teacher]),
    OverloadModule,
  ],
  controllers: [SubjectController],
  providers: [
    AddStudentInSubject,
    RemoveStudentFromSubject,
    CreateSubject,
    UpdateSubject,
    GetAllSubject,
    GetSubjectById,
    DeleteSubject,
  ],
  exports: [],
})
export class SubjectModule {}
