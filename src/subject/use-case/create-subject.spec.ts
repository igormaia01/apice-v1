import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Teacher } from '@teacher/teacher.entity';
import { CreateSubject } from '@subject/use-case/create-subject';
import { subjectFixture } from '@subject/subject-fixture';

import { Subject } from '../subject.entity';
import { createMockRepository } from '../../test/mock-repository';

describe('CreateSubject', () => {
  let createSubject: CreateSubject;
  const subjectRepository = createMockRepository<Subject>();
  const teacherRepository = createMockRepository<Teacher>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSubject,
        {
          provide: getRepositoryToken(Subject),
          useValue: subjectRepository,
        },
        {
          provide: getRepositoryToken(Teacher),
          useValue: teacherRepository,
        },
      ],
    }).compile();

    createSubject = module.get<CreateSubject>(CreateSubject);
  });
  test('should create a subject', async () => {
    const subject = subjectFixture();
    jest
      .spyOn(teacherRepository, 'findOneBy')
      .mockResolvedValueOnce(subject.teacher);
    jest.spyOn(subjectRepository, 'save').mockResolvedValueOnce(subject);
    jest
      .spyOn(subjectRepository, 'create')
      .mockImplementationOnce((data) => data);
    const result = await createSubject.execute({
      name: subject.name,
      teacherId: subject.teacher.id,
    });
    expect(teacherRepository.findOneBy).toHaveBeenCalledWith({
      id: subject.teacher.id,
    });
    expect(subjectRepository.create).toHaveBeenCalledWith({
      name: subject.name,
    });
    expect(subjectRepository.save).toHaveBeenCalledWith({
      name: subject.name,
      teacher: subject.teacher,
    });
    expect(result).toEqual(subject);
  });

  test('should throw an error when teacher not found', async () => {
    const subject = subjectFixture();
    jest.spyOn(teacherRepository, 'findOneBy').mockResolvedValueOnce(null);
    await expect(
      createSubject.execute({
        name: subject.name,
        teacherId: subject.teacher.id,
      }),
    ).rejects.toThrow('Teacher not found');
  });
});
