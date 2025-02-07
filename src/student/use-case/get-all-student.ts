import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '@student/student.entity';

export class GetAllStudent {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async execute(): Promise<Student[]> {
    return this.studentRepository.find();
  }
}
