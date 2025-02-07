import { faker } from '@faker-js/faker';
import { Student } from '@student/student.entity';

export function studentFixture(student: Partial<Student> = {}): Student {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    overloads: [],
    ...student,
  };
}
