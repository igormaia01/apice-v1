// TODO: Fix tests
// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { faker } from '@faker-js/faker';
// import { CalculateOverloadWhenAddActivityInSubject } from '@overload/use-case/calculate-when-add-activity-in-subject';
// import { CalculateOverloadWhenRemoveActivityFromSubject } from '@overload/use-case/calculate-when-remove-activity-from-subject';
// import { CalculateOverloadWhenUpdateActivityHours } from '@overload/use-case/calculate-overload-when-update-activity-hours';

// import { createMockRepository } from '../test/mock-repository';

// import { activityFixture } from './activity-fixture';
// import { Activity } from './activity.entity';
// import { ActivityService } from './activity.service';

// describe('ActivityService', () => {
//   let activityService: ActivityService;
//   const activityRepository = createMockRepository<Activity>();
//   const calcWHenRemove = { execute: jest.fn() };
//   const calcWhenUpdate = { execute: jest.fn() };
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ActivityService,
//         {
//           provide: getRepositoryToken(Activity),
//           useValue: activityRepository,
//         },
//         {
//           provide: CalculateOverloadWhenAddActivityInSubject,
//           useValue: {
//             execute: jest.fn(),
//           },
//         },
//         {
//           provide: CalculateOverloadWhenRemoveActivityFromSubject,
//           useValue: calcWHenRemove,
//         },
//         {
//           provide: CalculateOverloadWhenUpdateActivityHours,
//           useValue: calcWhenUpdate,
//         },
//       ],
//     }).compile();

//     activityService = module.get<ActivityService>(ActivityService);
//   });

//   const activityEntity = activityFixture({
//     id: faker.string.uuid(),
//     deadline: faker.date.recent(),
//     hours: faker.number.float({
//       min: 0.5,
//       max: 10,
//     }),
//     subjectId: faker.string.uuid(),
//   });
//   it('should create an activity', async () => {
//     jest
//       .spyOn(activityRepository, 'save')
//       .mockImplementation(async () => activityEntity);
//     const response = await activityService.create({
//       deadline: activityEntity.deadline,
//       hours: activityEntity.hours,
//       subjectId: activityEntity.subjectId,
//     });
//     expect(response).toBe(activityEntity);
//   });

//   it('should update an activity', async () => {
//     jest.spyOn(activityRepository, 'update').mockResolvedValue(activityEntity);
//     jest.spyOn(activityRepository, 'findOne').mockResolvedValue(activityEntity);
//     const hours = faker.number.float({ min: 0.5, max: 10, fractionDigits: 2 });
//     const response = await activityService.update(activityEntity.id, {
//       deadline: activityEntity.deadline,
//       hours,
//       subjectId: activityEntity.subjectId,
//     });
//     expect(activityRepository.update).toHaveBeenCalledWith(activityEntity.id, {
//       deadline: activityEntity.deadline,
//       hours: hours,
//       subjectId: activityEntity.subjectId,
//     });
//     expect(calcWhenUpdate.execute).toHaveBeenCalledWith(
//       activityEntity.id,
//       activityEntity.hours,
//       hours,
//     );
//     expect(response).toBe(activityEntity);
//   });

//   it('should find all activities', async () => {
//     jest
//       .spyOn(activityRepository, 'find')
//       .mockImplementation(async () => [activityEntity]);
//     const response = await activityService.findAll();
//     expect(activityRepository.find).toHaveBeenCalledTimes(1);
//     expect(response).toEqual([activityEntity]);
//   });

//   it('should find one activity', async () => {
//     jest
//       .spyOn(activityRepository, 'findOne')
//       .mockImplementation(async () => activityEntity);
//     const response = await activityService.findOne(activityEntity.id);
//     expect(activityRepository.findOne).toHaveBeenCalledWith({
//       where: { id: activityEntity.id },
//     });
//     expect(response).toBe(activityEntity);
//   });

//   it('should remove an activity', async () => {
//     const uuid = faker.string.uuid();
//     jest.spyOn(activityRepository, 'delete').mockResolvedValue(undefined);
//     await activityService.remove(uuid);
//     expect(calcWHenRemove.execute).toHaveBeenCalledWith(uuid);
//     expect(activityRepository.delete).toHaveBeenCalledWith(uuid);
//   });
// });
