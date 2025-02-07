import { Module } from '@nestjs/common';
import { StudentController } from '@student/student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '@student/student.entity';
import { User } from '@user/user.entity';
import { UserModule } from '@user/user.module';

import { CreateStudent } from './use-case/create-student';
import { UpdateStudent } from './use-case/update-student';
import { GetAllStudent } from './use-case/get-all-student';
import { GetStudentById } from './use-case/get-student-by-id';
import { DeleteStudent } from './use-case/delete-student';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  controllers: [StudentController],
  providers: [
    CreateStudent,
    UpdateStudent,
    DeleteStudent,
    GetAllStudent,
    GetStudentById,
  ],
  exports: [],
})
export class StudentModule {}
