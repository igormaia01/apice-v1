import { faker } from '@faker-js/faker';

import { User } from './user.entity';

export function userFixture(user: Partial<User> = {}): User {
  return {
    id: faker.string.uuid(),
    password: faker.string.alphanumeric(),
    username: faker.person.firstName(),
    created_at: faker.date.past(),
    ...user,
  };
}
