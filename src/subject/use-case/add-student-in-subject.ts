import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '@student/student.entity';
import { Subject } from '@subject/subject.entity';
import { Repository } from 'typeorm';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { CalculateOverloadWhenAddStudentInSubject } from '@overload/use-case/calculate-when-add-student-in-subject';

export class AddStudentInSubject {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly calculateOverloadWhenAddStudentInSubject: CalculateOverloadWhenAddStudentInSubject,
  ) {}

  async execute(studentId: string, subjectId: string): Promise<void> {
    const student = await this.studentRepository.findOneBy({ id: studentId });
    const subject = await this.subjectRepository.findOne({
      where: { id: subjectId },
      relations: {
        students: true,
      },
    });

    if (!student) throw new NotFoundException('Student not found');
    if (!subject) throw new NotFoundException('Subject not found');
    if (subject.students.find((s) => s.id === studentId))
      throw new ForbiddenException('Student already in subject');

    subject.students = subject.students || [];
    subject.students.push(student);
    await this.subjectRepository.save(subject);
    await this.calculateOverloadWhenAddStudentInSubject.execute(
      studentId,
      subjectId,
    );
  }
}
