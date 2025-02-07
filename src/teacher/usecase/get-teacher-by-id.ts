import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '@teacher/teacher.entity';
import { NotFoundException } from '@nestjs/common';

export class GetTeacherById {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async execute(id: string): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (teacher) {
      return teacher;
    }
    throw new NotFoundException('Teacher not found');
  }
}
