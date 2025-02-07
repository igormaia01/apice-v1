import { faker } from '@faker-js/faker';
import { Subject } from '@subject/subject.entity';
import { teacherFixture } from '@teacher/teacher-fixture';

export function subjectFixture(subject: Partial<Subject> = {}): Subject {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    teacher: teacherFixture(),
    activities: [],
    students: [],
    ...subject,
  };
}
