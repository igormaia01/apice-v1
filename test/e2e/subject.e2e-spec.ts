import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/student.entity';
import { Subject } from 'src/subject/subject.entity';
import { Activity } from 'src/activity/activity.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { ConfigModule } from '@nestjs/config';
import { faker } from '@faker-js/faker';
import { TeacherModule } from 'src/teacher/teacher.module';
import { SubjectModule } from 'src/subject/subject.module';
import { StudentModule } from 'src/student/student.module';
import { Overload } from 'src/overload/overload.entity';

describe('Subject', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        SubjectModule,
        TeacherModule,
        StudentModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT as string),
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

  it(`create an subject and get in database`, async () => {
    const teacher = {
      name: 'Test Teacher',
    };
    const teacherResponse = await request(app.getHttpServer())
      .post('/teacher')
      .send(teacher);

    const input = {
      name: faker.lorem.words(10),
      teacherId: teacherResponse.body.id,
    };
    const response = await request(app.getHttpServer())
      .post('/subject')
      .send(input);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: input.name,
        teacher: expect.objectContaining({
          id: teacherResponse.body.id,
          name: teacher.name,
        }),
      }),
    );

    const responseGet = await request(app.getHttpServer()).get(
      `/subject/${response.body.id}`,
    );
    expect(responseGet.status).toBe(200);
    expect(responseGet.body).toEqual({
      id: response.body.id,
      name: input.name,
    });
  });

  it(`get all subjects`, async () => {
    const teacher = {
      name: 'Test Teacher',
    };
    const teacherResponse = await request(app.getHttpServer())
      .post('/teacher')
      .send(teacher);

    const input = {
      name: faker.lorem.words(10),
      teacherId: teacherResponse.body.id,
    };
    await request(app.getHttpServer()).post('/subject').send(input);

    const response = await request(app.getHttpServer()).get('/subject');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          students: expect.any(Array),
          teacher: expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
        }),
      ]),
    );
  });

  it(`update an subject`, async () => {
    const teacher = {
      name: 'Test Teacher',
    };
    const teacherResponse = await request(app.getHttpServer())
      .post('/teacher')
      .send(teacher);

    const input = {
      name: faker.lorem.words(10),
      teacherId: teacherResponse.body.id,
    };
    const response = await request(app.getHttpServer())
      .post('/subject')
      .send(input);

    const updateInput = {
      name: faker.lorem.words(10),
    };
    const responseUpdate = await request(app.getHttpServer())
      .put(`/subject/${response.body.id}`)
      .send(updateInput);
    expect(responseUpdate.status).toBe(200);
    expect(responseUpdate.body).toEqual({
      id: response.body.id,
      name: updateInput.name,
    });

    const responseGet = await request(app.getHttpServer()).get(
      `/subject/${response.body.id}`,
    );
    expect(responseGet.status).toBe(200);
    expect(responseGet.body).toEqual({
      id: response.body.id,
      name: updateInput.name,
    });
  });

  it(`delete an subject`, async () => {
    const teacher = {
      name: 'Test Teacher',
    };
    const teacherResponse = await request(app.getHttpServer())
      .post('/teacher')
      .send(teacher);

    const input = {
      name: faker.lorem.words(10),
      teacherId: teacherResponse.body.id,
    };
    const response = await request(app.getHttpServer())
      .post('/subject')
      .send(input);

    const responseDelete = await request(app.getHttpServer()).delete(
      `/subject/${response.body.id}`,
    );
    expect(responseDelete.status).toBe(200);
    expect(responseDelete.body).toEqual({});
  });

  it(`add student in subject`, async () => {
    const teacher = {
      name: 'Test Teacher',
    };
    const teacherResponse = await request(app.getHttpServer())
      .post('/teacher')
      .send(teacher);

    const input = {
      name: faker.lorem.words(10),
      teacherId: teacherResponse.body.id,
    };
    const subjectResponse = await request(app.getHttpServer())
      .post('/subject')
      .send(input);

    const student = {
      name: 'Test Student',
    };
    const studentResponse = await request(app.getHttpServer())
      .post('/student')
      .send(student);

    const response = await request(app.getHttpServer())
      .post('/subject/add-student')
      .send({
        studentId: studentResponse.body.id,
        subjectId: subjectResponse.body.id,
      });
    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
