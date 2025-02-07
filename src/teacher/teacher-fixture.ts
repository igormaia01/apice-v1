import { faker } from '@faker-js/faker';
import { Teacher } from '@teacher/teacher.entity';

export function teacherFixture(teacher: Partial<Teacher> = {}): Teacher {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    ...teacher,
  };
}
