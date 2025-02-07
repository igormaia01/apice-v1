import { faker } from '@faker-js/faker';
import { subjectFixture } from '@subject/subject-fixture';

import { Activity } from './activity.entity';

export function activityFixture(activity: Partial<Activity> = {}): Activity {
  return {
    id: faker.string.uuid(),
    deadline: faker.date.future(),
    hours: faker.number.float({ min: 1, max: 10 }),
    subjectId: faker.string.uuid(),
    subject: subjectFixture(),
    created_at: faker.date.recent(),
    ...activity,
  };
}
