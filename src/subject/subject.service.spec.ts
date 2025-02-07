// TODO: test use case
// import { Test, TestingModule } from '@nestjs/testing';
// import { SubjectService } from '@subject/subject.service';
// import { Subject } from '@subject/subject.entity';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { subjectFixture } from '@subject/subject-fixture';

// import { createMockRepository } from '../test/mock-repository';

// describe('SubjectService', () => {
//   let subjectService: SubjectService;
//   const subjectRepository = createMockRepository<Subject>();
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         SubjectService,
//         {
//           provide: getRepositoryToken(Subject),
//           useValue: subjectRepository,
//         },
//       ],
//     }).compile();

//     subjectService = module.get<SubjectService>(SubjectService);
//   });

//   it('should update a subject', async () => {
//     const result = subjectFixture();
//     jest.spyOn(subjectRepository, 'update').mockResolvedValue(result);
//     jest.spyOn(subjectRepository, 'findOne').mockResolvedValue(result);
//     const response = await subjectService.update(result.id, {
//       name: result.name,
//     });
//     expect(subjectRepository.update).toHaveBeenCalledWith(result.id, {
//       name: result.name,
//     });
//     expect(response).toBe(result);
//   });

//   it('should find all subjects', async () => {
//     const result = [subjectFixture()];
//     jest
//       .spyOn(subjectRepository, 'find')
//       .mockImplementation(async () => result);
//     const response = await subjectService.findAll();
//     expect(response).toBe(result);
//   });

//   it('should find one subject', async () => {
//     const result = subjectFixture();
//     jest
//       .spyOn(subjectRepository, 'findOne')
//       .mockImplementation(async () => result);
//     const response = await subjectService.findOne(result.id);
//     expect(response).toBe(result);
//   });

//   it('should remove a subject', async () => {
//     const id = '1';
//     jest.spyOn(subjectRepository, 'delete').mockResolvedValue(undefined);
//     await subjectService.remove(id);
//     expect(subjectRepository.delete).toHaveBeenCalledWith(id);
//   });
// });
