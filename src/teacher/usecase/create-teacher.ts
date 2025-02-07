import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '@teacher/teacher.entity';
import { CreateTeacherDTO } from '@teacher/dto/create-teacher';
import { User } from '@user/user.entity';
import { ForbiddenException } from '@nestjs/common';
import { SetTeacher } from '@user/usecase/setTeacher';

export class CreateTeacher {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    private readonly setTeacher: SetTeacher,
  ) {}

  async execute(teacher: CreateTeacherDTO, user: User): Promise<Teacher> {
    if (user.studentId || user.teacherId) {
      throw new ForbiddenException('already signed for student or teacher');
    }
    const teacherCreated = await this.teacherRepository.save(teacher);
    await this.setTeacher.execute(user.id, teacherCreated.id);
    return teacherCreated;
  }
}
