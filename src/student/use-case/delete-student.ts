import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '@student/student.entity';
import { User } from '@user/user.entity';

export class DeleteStudent {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(id: string, studentId: string): Promise<void> {
    await this.userRepository.update(studentId, { studentId: null });
    await this.studentRepository.delete(id);
  }
}
