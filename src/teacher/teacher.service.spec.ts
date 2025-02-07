// TODO: create test for use case
// import { Test, TestingModule } from '@nestjs/testing';
// import { TeacherService } from '@teacher/teacher.service';
// import { Teacher } from '@teacher/teacher.entity';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { faker } from '@faker-js/faker';
// import { userFixture } from '@user/user-fixture';
// import { SetTeacher } from '@user/usecase/setTeacher';

// import { createMockRepository } from '../test/mock-repository';

// describe('TeacherService', () => {
//   let service: TeacherService;
//   const teacherRepository = createMockRepository<Teacher>();

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
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

//     service = module.get<TeacherService>(TeacherService);
//   });

//   it('should create a teacher', async () => {
//     const user = userFixture();
//     const name = faker.person.fullName();
//     const teacher = {
//       id: faker.string.uuid(),
//       name,
//     };

//     jest
//       .spyOn(teacherRepository, 'save')
//       .mockImplementation(async () => teacher);

//     const response = await service.create(teacher, user);
//     expect(response).toBe(teacher);
//   });

//   it('should update a teacher', async () => {
//     const name = faker.person.fullName();
//     const teacher = {
//       id: faker.string.uuid(),
//       name,
//     };

//     jest.spyOn(teacherRepository, 'update').mockResolvedValue(teacher);
//     jest.spyOn(teacherRepository, 'findOne').mockResolvedValue(teacher);

//     const response = await service.update(teacher.id, {
//       name,
//     });

//     expect(teacherRepository.update).toHaveBeenCalledWith(teacher.id, {
//       name,
//     });
//     expect(response).toBe(teacher);
//   });

//   it('should find all teachers', async () => {
//     const teacher = {
//       id: faker.string.uuid(),
//       name: faker.person.fullName(),
//     };

//     jest.spyOn(teacherRepository, 'find').mockResolvedValue([teacher]);

//     const response = await service.findAll();
//     expect(response).toEqual([teacher]);
//   });

//   it('should find one teacher', async () => {
//     const teacher = {
//       id: faker.string.uuid(),
//       name: faker.person.fullName(),
//     };

//     jest.spyOn(teacherRepository, 'findOne').mockResolvedValue(teacher);

//     const response = await service.findOne(teacher.id);
//     expect(response).toEqual(teacher);
//   });

//   it('should remove a teacher', async () => {
//     const teacher = {
//       id: faker.string.uuid(),
//       name: faker.person.fullName(),
//     };

//     jest.spyOn(teacherRepository, 'delete').mockResolvedValue(undefined);

//     await service.remove(teacher.id);
//     expect(teacherRepository.delete).toHaveBeenCalledWith(teacher.id);
//   });
// });
