import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '@subject/subject.entity';
import { Repository } from 'typeorm';

export class DeleteSubject {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async execute(id: string): Promise<void> {
    const subject = await this.subjectRepository.findOne({
      where: { id },
      relations: ['students'],
    });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    if (subject.students.length > 0) {
      throw new ForbiddenException('Subject has students');
    }

    await this.subjectRepository.delete(id);
  }
}
