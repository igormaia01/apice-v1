import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '@teacher/teacher.entity';

export class GetAllTeacher {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async execute(): Promise<Teacher[]> {
    return this.teacherRepository.find();
  }
}
