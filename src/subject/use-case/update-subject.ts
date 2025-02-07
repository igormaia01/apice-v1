import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '@subject/subject.entity';
import { Repository } from 'typeorm';
import { UpdateSubjectDTO } from '@subject/dto/update-subject';
import { Teacher } from '@teacher/teacher.entity';

export class UpdateSubject {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async execute(
    id: string,
    subjectDataToUpdate: UpdateSubjectDTO,
  ): Promise<Subject> {
    await this.teacherRepository.findOneOrFail({
      where: { id: subjectDataToUpdate.teacherId },
    });
    await this.subjectRepository.update(id, subjectDataToUpdate);
    const subject = await this.subjectRepository.findOneByOrFail({ id });
    return subject;
  }
}
