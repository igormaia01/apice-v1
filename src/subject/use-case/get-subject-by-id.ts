import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '@subject/subject.entity';
import { Repository } from 'typeorm';

export class GetSubjectById {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async execute(id: string): Promise<Subject | null> {
    const subject = await this.subjectRepository.findOne({
      where: { id },
      relations: {
        activities: true,
        students: true,
        teacher: true,
      },
    });
    if (subject) {
      return subject;
    }
    throw new Error('Subject not found');
  }
}
