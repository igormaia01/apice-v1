import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '@teacher/teacher.entity';
import { User } from '@user/user.entity';

export class DeleteTeacher {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    await this.userRepository.update(userId, { teacherId: null });
    await this.teacherRepository.delete(id);
  }
}
