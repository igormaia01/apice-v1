import { env } from 'process';

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { faker } from '@faker-js/faker';
import { ActivityModule } from 'src/activity/activity.module';
import { StudentModule } from 'src/student/student.module';
import { TeacherModule } from 'src/teacher/teacher.module';
import { SubjectModule } from 'src/subject/subject.module';
import { Student } from 'src/student/student.entity';
import { Subject } from 'src/subject/subject.entity';
import { Activity } from 'src/activity/activity.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Overload } from 'src/overload/overload.entity';

describe('Activity', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        SubjectModule,
        TeacherModule,
        StudentModule,
        ActivityModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: parseInt(env.DATABASE_PORT as string),
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          entities: [Student, Subject, Activity, Teacher, Overload],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it(`create an activity and get in database`, async () => {
    const teacher = {
      name: 'Test Teacher',
    };

    const teacherResponse = await request(app.getHttpServer())
      .post('/teacher')
      .send(teacher);

    const subject = {
      name: faker.lorem.words(10),
      teacherId: teacherResponse.body.id,
    };
    const response = await request(app.getHttpServer())
      .post('/subject')
      .send(subject);

    // .set('Authorization', `Bearer ${token}`)

    const input = {
      deadline: faker.date.future(),
      hours: faker.number.float({
        min: 0.5,
        max: 10,
      }),
      subjectId: response.body.id,
    };

    const responseActivity = await request(app.getHttpServer())
      .post('/activity')
      .send(input);
    expect(responseActivity.status).toBe(201);
    expect(responseActivity.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        deadline: input.deadline.toISOString(),
        hours: input.hours,
        subjectId: input.subjectId,
      }),
    );
  });

  it(`update an activity`, async () => {
    const teacher = {
      name: 'Test Teacher',
    };
    const teacherResponse = await request(app.getHttpServer())
      .post('/teacher')
      .send(teacher);

    const subject = {
      name: faker.lorem.words(10),
      teacherId: teacherResponse.body.id,
    };
    const response = await request(app.getHttpServer())
      .post('/subject')
      .send(subject);

    const input = {
      deadline: faker.date.future(),
      hours: faker.number.float({
        min: 0.5,
        max: 10,
      }),
      subjectId: response.body.id,
    };
    const responseActivity = await request(app.getHttpServer())
      .post('/activity')
      .send(input);

    const updateInput = {
      deadline: faker.date.future(),
      hours: faker.number.float({
        min: 0.5,
        max: 10,
      }),
    };
    const responseUpdate = await request(app.getHttpServer())
      .put(`/activity/${responseActivity.body.id}`)
      .send(updateInput);
    expect(responseUpdate.status).toBe(200);
    expect(responseUpdate.body).toEqual({
      id: responseActivity.body.id,
      deadline: updateInput.deadline.toISOString(),
      hours: updateInput.hours,
      subjectId: input.subjectId,
      created_at: expect.any(String),
    });
  });

  it(`delete an activity`, async () => {
    const teacher = {
      name: 'Test Teacher',
    };
    const teacherResponse = await request(app.getHttpServer())
      .post('/teacher')
      .send(teacher);

    const subject = {
      name: faker.lorem.words(10),
      teacherId: teacherResponse.body.id,
    };
    const response = await request(app.getHttpServer())
      .post('/subject')
      .send(subject);

    const input = {
      deadline: faker.date.future(),
      hours: faker.number.float({
        min: 0.5,
        max: 10,
      }),
      subjectId: response.body.id,
    };
    const responseActivity = await request(app.getHttpServer())
      .post('/activity')
      .send(input);

    const responseDelete = await request(app.getHttpServer()).delete(
      `/activity/${responseActivity.body.id}`,
    );
    expect(responseDelete.status).toBe(200);
    const responseGet = await request(app.getHttpServer()).get(
      `/activity/${responseActivity.body.id}`,
    );
    expect(responseGet.status).toBe(404);
  });

  it(`get all activities`, async () => {
    const teacher = {
      name: 'Test Teacher',
    };
    const teacherResponse = await request(app.getHttpServer())
      .post('/teacher')
      .send(teacher);

    const subject = {
      name: faker.lorem.words(10),
      teacherId: teacherResponse.body.id,
    };
    const response = await request(app.getHttpServer())
      .post('/subject')
      .send(subject);

    const input = {
      deadline: faker.date.future(),
      hours: faker.number.float({
        min: 0.5,
        max: 10,
      }),
      subjectId: response.body.id,
    };
    const responseActivity = await request(app.getHttpServer())
      .post('/activity')
      .send(input);

    const responseGet = await request(app.getHttpServer()).get(`/activity`);
    expect(responseGet.status).toBe(200);
    expect(responseGet.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: responseActivity.body.id,
          deadline: input.deadline.toISOString(),
          hours: input.hours,
          subjectId: input.subjectId,
        }),
      ]),
    );
  });

  it(`get an activity`, async () => {
    const teacher = {
      name: 'Test Teacher',
    };
    const teacherResponse = await request(app.getHttpServer())
      .post('/teacher')
      .send(teacher);

    const subject = {
      name: faker.lorem.words(10),
      teacherId: teacherResponse.body.id,
    };
    const response = await request(app.getHttpServer())
      .post('/subject')
      .send(subject);

    const input = {
      deadline: faker.date.future(),
      hours: faker.number.float({
        min: 0.5,
        max: 10,
      }),
      subjectId: response.body.id,
    };
    const responseActivity = await request(app.getHttpServer())
      .post('/activity')
      .send(input);

    const responseGet = await request(app.getHttpServer()).get(
      `/activity/${responseActivity.body.id}`,
    );
    expect(responseGet.status).toBe(200);
    expect(responseGet.body).toEqual(
      expect.objectContaining({
        id: responseActivity.body.id,
        deadline: input.deadline.toISOString(),
        hours: input.hours,
        subjectId: input.subjectId,
      }),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
