import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '@student/student.entity';
import { NotFoundException } from '@nestjs/common';

export class GetStudentById {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async execute(id: string): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: {
        subjects: true,
      },
    });
    if (student) {
      return student;
    }
    throw new NotFoundException('Student not found');
  }
}
