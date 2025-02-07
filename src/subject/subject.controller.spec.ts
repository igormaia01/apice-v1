// TODO: fix test
// import { Test, TestingModule } from '@nestjs/testing';
// import { SubjectController } from '@subject/subject.controller';
// import { Subject } from '@subject/subject.entity';
// import { SubjectService } from '@subject/subject.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { faker } from '@faker-js/faker';
// import { subjectFixture } from '@subject/subject-fixture';
// import { CreateSubject } from '@subject/usecase/create-subject';
// import { Teacher } from '@teacher/teacher.entity';

// import { Student } from '../student/student.entity';
// import { createMockRepository } from '../test/mock-repository';
// import { CalculateOverloadWhenAddStudentInSubject } from '../overload/usecase/calculate-when-add-student-in-subject';

// import { AddStudentInSubject } from './usecase/add-student-in-subject';

// describe('SubjectController', () => {
//   let subjectController: SubjectController;
//   let subjectService: SubjectService;
//   let addStudentInSubject: AddStudentInSubject;
//   let createSubject: CreateSubject;
//   const subjectRepository = createMockRepository<Subject>();
//   const studentRepository = createMockRepository<Student>();
//   const teacherRepository = createMockRepository<Student>();

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [SubjectController],
//       providers: [
//         SubjectService,
//         AddStudentInSubject,
//         CreateSubject,
//         {
//           provide: getRepositoryToken(Subject),
//           useValue: subjectRepository,
//         },
//         {
//           provide: getRepositoryToken(Student),
//           useValue: studentRepository,
//         },
//         {
//           provide: getRepositoryToken(Teacher),
//           useValue: teacherRepository,
//         },
//         {
//           provide: CalculateOverloadWhenAddStudentInSubject,
//           useValue: {
//             execute: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     subjectService = module.get<SubjectService>(SubjectService);
//     subjectController = module.get<SubjectController>(SubjectController);
//     addStudentInSubject = module.get<AddStudentInSubject>(AddStudentInSubject);
//     createSubject = module.get<CreateSubject>(CreateSubject);
//   });

//   describe('findAll', () => {
//     it('should return an array of subjects', async () => {
//       const subjects: Subject[] = [subjectFixture()];
//       jest.spyOn(subjectService, 'findAll').mockResolvedValueOnce(subjects);

//       expect(await subjectController.findAll()).toBe(subjects);
//     });
//   });

//   describe('findOne', () => {
//     it('should return a subject', async () => {
//       const subjects = subjectFixture();
//       jest
//         .spyOn(subjectService, 'findOne')
//         .mockImplementation(async () => subjects);

//       expect(await subjectController.findOne(subjects.id)).toBe(subjects);
//     });
//   });

//   describe('create', () => {
//     it('should create a subject', async () => {
//       const subject = subjectFixture();
//       const input = {
//         name: subject.name,
//         teacherId: subject.teacher.id,
//       };
//       jest
//         .spyOn(createSubject, 'execute')
//         .mockImplementation(async () => subject);

//       expect(await subjectController.create(input)).toBe(subject);
//     });
//   });

//   describe('update', () => {
//     it('should update a subject', async () => {
//       const subject = subjectFixture();
//       jest
//         .spyOn(subjectService, 'update')
//         .mockImplementation(async () => subject);

//       expect(await subjectController.update(subject.id, subject)).toBe(subject);
//     });
//   });

//   describe('remove', () => {
//     it('should remove a subject', async () => {
//       jest
//         .spyOn(subjectService, 'remove')
//         .mockImplementation(async () => undefined);
//       const id = faker.string.uuid();
//       const response = await subjectController.remove(id);
//       expect(response).toBe(undefined);
//     });
//   });

//   describe('addStudent', () => {
//     it('should add a student in a subject', async () => {
//       const subjectId = faker.string.uuid();
//       const studentId = faker.string.uuid();
//       jest
//         .spyOn(addStudentInSubject, 'execute')
//         .mockImplementation(async () => undefined);
//       await subjectController.addStudent({
//         studentId,
//         subjectId,
//       });
//       expect(addStudentInSubject.execute).toHaveBeenCalledWith(
//         studentId,
//         subjectId,
//       );
//     });
//   });
// });
