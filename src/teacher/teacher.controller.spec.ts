// TODO: Fix this test
// import { Test, TestingModule } from '@nestjs/testing';
// import { TeacherController } from '@teacher/teacher.controller';
// import { Teacher } from '@teacher/teacher.entity';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { userFixture } from '@user/user-fixture';
// import { SetTeacher } from '@user/usecase/setTeacher';

// import { createMockRepository } from '../test/mock-repository';

// describe('TeacherController', () => {
//   let controller: TeacherController;
//   let teacherService: TeacherService;
//   const teacherRepository = createMockRepository<Teacher>();

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [TeacherController],
//       providers: [
//         TeacherService,
//         {
//           provide: getRepositoryToken(Teacher),
//           useValue: teacherRepository,
//         },
//         {
//           provide: SetTeacher,
//           useValue: {
//             execute: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     teacherService = module.get<TeacherService>(TeacherService);
//     controller = module.get<TeacherController>(TeacherController);
//   });

//   describe('create', () => {
//     it('should create a teacher', async () => {
//       const user = userFixture();

//       const teacher = {
//         id: '1',
//         name: 'John Doe',
//       };
//       jest.spyOn(teacherService, 'create').mockResolvedValueOnce(teacher);

//       expect(await controller.create(user, teacher)).toBe(teacher);
//     });
//   });

//   describe('findAll', () => {
//     it('should return an array of teachers', async () => {
//       const teachers: Teacher[] = [
//         {
//           id: '1',
//           name: 'John Doe',
//         },
//       ];
//       jest.spyOn(teacherService, 'findAll').mockResolvedValueOnce(teachers);

//       expect(await controller.findAll()).toBe(teachers);
//     });
//   });

//   describe('findOne', () => {
//     it('should return a teacher', async () => {
//       const teacher = {
//         id: '1',
//         name: 'John Doe',
//       };
//       jest.spyOn(teacherService, 'findOne').mockResolvedValueOnce(teacher);

//       expect(await controller.findOne(teacher.id)).toBe(teacher);
//     });
//   });

//   describe('remove', () => {
//     it('should remove a teacher', async () => {
//       const teacher = {
//         id: '1',
//         name: 'John Doe',
//       };
//       jest.spyOn(teacherService, 'remove').mockResolvedValueOnce(undefined);
//       await controller.remove(teacher.id);
//       expect(teacherService.remove).toHaveBeenCalledWith(teacher.id);
//     });
//   });
// });
