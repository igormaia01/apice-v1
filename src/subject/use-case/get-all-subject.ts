import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '@subject/subject.entity';
import { Repository } from 'typeorm';

export class GetAllSubject {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async execute(): Promise<Subject[]> {
    return this.subjectRepository.find({ relations: ['students', 'teacher'] });
  }
}
