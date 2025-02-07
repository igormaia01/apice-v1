import { Test, TestingModule } from '@nestjs/testing';
import { Subject } from '@subject/subject.entity';
import { Student } from '@student/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { subjectFixture } from '@subject/subject-fixture';
import { studentFixture } from '@student/student-fixture';
import { CalculateOverloadWhenAddStudentInSubject } from '@overload/use-case/calculate-when-add-student-in-subject';

import { createMockRepository } from '../../test/mock-repository';

import { AddStudentInSubject } from './add-student-in-subject';

describe('AddStudentInSubject', () => {
  let addStudentInSubject: AddStudentInSubject;
  const subjectRepository = createMockRepository<Subject>();
  const studentRepository = createMockRepository<Student>();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddStudentInSubject,
        {
          provide: getRepositoryToken(Subject),
          useValue: subjectRepository,
        },
        {
          provide: getRepositoryToken(Student),
          useValue: studentRepository,
        },
        {
          provide: CalculateOverloadWhenAddStudentInSubject,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    addStudentInSubject = module.get<AddStudentInSubject>(AddStudentInSubject);
  });

  test('should add a student in a subject', async () => {
    const subject = subjectFixture();
    const student = studentFixture();
    jest.spyOn(studentRepository, 'findOneBy').mockResolvedValueOnce(student);
    jest.spyOn(subjectRepository, 'findOne').mockResolvedValueOnce(subject);
    jest.spyOn(subjectRepository, 'save').mockResolvedValueOnce(subject);
    await addStudentInSubject.execute(student.id, subject.id);
    expect(studentRepository.findOneBy).toHaveBeenCalledWith({
      id: student.id,
    });
    expect(subjectRepository.findOne).toHaveBeenCalledWith({
      where: { id: subject.id },
      relations: {
        students: true,
      },
    });
    expect(subjectRepository.save).toHaveBeenCalledWith(subject);
    expect(subject.students).toEqual([student]);
  });

  test('should throw an error when student not found', async () => {
    const subject = subjectFixture();
    jest.spyOn(studentRepository, 'findOneBy').mockResolvedValueOnce(null);
    jest.spyOn(subjectRepository, 'findOne').mockResolvedValueOnce(subject);
    await expect(
      addStudentInSubject.execute('student-id', subject.id),
    ).rejects.toThrow('Student not found');
  });
  test('should throw an error when subject not found', async () => {
    const student = studentFixture();
    const subject = subjectFixture();
    jest.spyOn(studentRepository, 'findOneBy').mockResolvedValueOnce(student);
    jest.spyOn(subjectRepository, 'findOne').mockResolvedValueOnce(null);
    await expect(
      addStudentInSubject.execute('student-id', subject.id),
    ).rejects.toThrow('Subject not found');
  });
});
