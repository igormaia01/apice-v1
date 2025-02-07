import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { CalculateOverloadWhenAddActivityInSubject } from '@overload/use-case/calculate-when-add-activity-in-subject';
import { CalculateOverloadWhenRemoveActivityFromSubject } from '@overload/use-case/calculate-when-remove-activity-from-subject';
import { CalculateOverloadWhenUpdateActivityHours } from '@overload/use-case/calculate-overload-when-update-activity-hours';

import { createMockRepository } from '../test/mock-repository';

import { activityFixture } from './activity-fixture';
import { Activity } from './activity.entity';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';

describe('ActivityController', () => {
  let activityController: ActivityController;
  let activityService: ActivityService;
  const activityRepository = createMockRepository<Activity>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [
        ActivityService,
        {
          provide: getRepositoryToken(Activity),
          useValue: activityRepository,
        },
        {
          provide: CalculateOverloadWhenAddActivityInSubject,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: CalculateOverloadWhenRemoveActivityFromSubject,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: CalculateOverloadWhenUpdateActivityHours,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    activityController = module.get<ActivityController>(ActivityController);
    activityService = module.get<ActivityService>(ActivityService);
  });

  const activityEntity = activityFixture({
    id: faker.string.uuid(),
    deadline: faker.date.recent(),
    hours: faker.number.float({
      min: 0.5,
      max: 10,
    }),
    subjectId: faker.string.uuid(),
  });

  describe('findAll', () => {
    it('should return an array of activities', async () => {
      const result = [activityEntity];
      jest
        .spyOn(activityService, 'findAll')
        .mockImplementation(async () => result);

      expect(await activityController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return an activity', async () => {
      jest
        .spyOn(activityService, 'findOne')
        .mockImplementation(async () => activityEntity);

      expect(await activityController.findOne(activityEntity.id)).toBe(
        activityEntity,
      );
    });
  });

  describe('create', () => {
    it('should create an activity', async () => {
      jest
        .spyOn(activityService, 'create')
        .mockImplementation(async () => activityEntity);

      expect(await activityController.create(activityEntity)).toBe(
        activityEntity,
      );
    });
  });

  describe('update', () => {
    it('should update an activity', async () => {
      jest
        .spyOn(activityService, 'update')
        .mockImplementation(async () => activityEntity);

      expect(
        await activityController.update(activityEntity.id, activityEntity),
      ).toBe(activityEntity);
    });
  });

  describe('remove', () => {
    it('should remove an activity', async () => {
      jest
        .spyOn(activityService, 'remove')
        .mockImplementation(async () => undefined);

      expect(await activityController.remove(activityEntity.id)).toBe(
        undefined,
      );
    });
  });
});
