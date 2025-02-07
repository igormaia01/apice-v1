// TODO: Fix tests
// import { Test, TestingModule } from '@nestjs/testing';
// import { StudentController } from '@student/student.controller';
// import { StudentService } from '@student/student.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Student } from '@student/student.entity';
// import { studentFixture } from '@student/student-fixture';
// import { userFixture } from '@user/user-fixture';
// import { SetStudent } from '@user/usecase/setStudent';

// import { createMockRepository } from '../test/mock-repository';

// describe('StudentController', () => {
//   let studentController: StudentController;
//   let studentService: StudentService;
//   const studentRepository = createMockRepository<Student>();
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [StudentController],
//       providers: [
//         StudentService,
//         {
//           provide: getRepositoryToken(Student),
//           useValue: studentRepository,
//         },
//         {
//           provide: SetStudent,
//           useValue: {
//             execute: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     studentService = module.get<StudentService>(StudentService);
//     studentController = module.get<StudentController>(StudentController);
//   });

//   describe('findAll', () => {
//     it('should return an array of students', async () => {
//       const result = [studentFixture()];
//       jest
//         .spyOn(studentService, 'findAll')
//         .mockImplementation(async () => result);

//       expect(await studentController.findAll()).toBe(result);
//     });
//   });

//   describe('findOne', () => {
//     it('should return a student', async () => {
//       const result = studentFixture();
//       jest
//         .spyOn(studentService, 'findOne')
//         .mockImplementation(async () => result);

//       expect(await studentController.findOne(result.id)).toBe(result);
//     });
//   });

//   describe('create', () => {
//     it('should create a student', async () => {
//       const user = userFixture();
//       const result = studentFixture();
//       const spy = jest
//         .spyOn(studentService, 'create')
//         .mockImplementation(async () => result);
//       const response = await studentController.create(user, {
//         name: result.name,
//       });
//       expect(spy).toHaveBeenCalledWith({ name: result.name }, user);
//       expect(response).toBe(result);
//     });
//   });

//   describe('update', () => {
//     it('should update a student', async () => {
//       const result = studentFixture();
//       jest
//         .spyOn(studentService, 'update')
//         .mockImplementation(async () => result);

//       expect(await studentController.update(result.id, result)).toBe(result);
//     });
//   });

//   describe('remove', () => {
//     it('should delete a student', async () => {
//       const result = {
//         id: crypto.randomUUID(),
//         name: 'john doe',
//       };
//       jest
//         .spyOn(studentService, 'remove')
//         .mockImplementation(async () => undefined);

//       expect(await studentController.remove(result.id)).toBe(undefined);
//     });
//   });
// });
