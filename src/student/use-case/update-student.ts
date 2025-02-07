import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDTO } from '@student/dto/create-student';
import { Student } from '@student/student.entity';
import { NotFoundException } from '@nestjs/common';
import { SetStudent } from '@user/usecase/setStudent';

export class UpdateStudent {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly setStudent: SetStudent,
  ) {}

  async execute(
    id: string,
    studentDataToUpdate: CreateStudentDTO,
  ): Promise<Student | void> {
    const student = await this.studentRepository.findBy({ id });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    await this.studentRepository.update(id, studentDataToUpdate);
    return await this.studentRepository.findOneByOrFail({ id });
  }
}
