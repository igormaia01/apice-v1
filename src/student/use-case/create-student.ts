import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDTO } from '@student/dto/create-student';
import { User } from '@user/user.entity';
import { Student } from '@student/student.entity';
import { ForbiddenException } from '@nestjs/common';
import { SetStudent } from '@user/usecase/setStudent';

export class CreateStudent {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly setStudent: SetStudent,
  ) {}

  async execute(student: CreateStudentDTO, user: User): Promise<Student> {
    if (user.studentId || user.teacherId) {
      throw new ForbiddenException('already signed for student or teacher');
    }
    const studentCreated = await this.studentRepository.save(student);
    await this.setStudent.execute(user.id, studentCreated.id);
    return studentCreated;
  }
}
