import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '@subject/subject.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDTO } from '@subject/dto/create-subject';
import { Teacher } from '@teacher/teacher.entity';

export class CreateSubject {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async execute(subjectDTO: CreateSubjectDTO): Promise<Subject> {
    const teacher = await this.teacherRepository.findOneBy({
      id: subjectDTO.teacherId,
    });
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    const subject = this.subjectRepository.create({
      name: subjectDTO.name,
    });
    return this.subjectRepository.save({ ...subject, teacher });
  }
}
