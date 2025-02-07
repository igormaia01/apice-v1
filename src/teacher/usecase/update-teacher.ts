import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '@teacher/teacher.entity';
import { UpdateTeacherDTO } from '@teacher/dto/update-teacher';
import { NotFoundException } from '@nestjs/common';

export class UpdateTeacher {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async execute(
    id: string,
    teacherDataToUpdate: UpdateTeacherDTO,
  ): Promise<Teacher> {
    const teacher = await this.teacherRepository.findBy({ id });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    await this.teacherRepository.update(id, teacherDataToUpdate);
    const updatedTeacher = await this.teacherRepository.findOneByOrFail({ id });

    return updatedTeacher;
  }
}
