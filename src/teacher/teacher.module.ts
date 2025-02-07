import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from '@teacher/teacher.entity';
import { TeacherController } from '@teacher/teacher.controller';
import { User } from '@user/user.entity';
import { UserModule } from '@user/user.module';

import { CreateTeacher } from './usecase/create-teacher';
import { DeleteTeacher } from './usecase/delete-teacher';
import { GetTeacherById } from './usecase/get-teacher-by-id';
import { GetAllTeacher } from './usecase/get-all-teacher';
import { UpdateTeacher } from './usecase/update-teacher';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  controllers: [TeacherController],
  providers: [
    CreateTeacher,
    DeleteTeacher,
    GetAllTeacher,
    GetTeacherById,
    UpdateTeacher,
  ],
  exports: [],
})
export class TeacherModule {}
