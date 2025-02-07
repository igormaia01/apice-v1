import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/student.entity';
import { Subject } from 'src/subject/subject.entity';
import { Activity } from 'src/activity/activity.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { ConfigModule } from '@nestjs/config';
import { TeacherModule } from 'src/teacher/teacher.module';
import { Overload } from 'src/overload/overload.entity';

describe('Teacher', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TeacherModule,
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

  it(`get all teachers`, async () => {
    const response = await request(app.getHttpServer()).get('/teacher');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
        }),
      ]),
    );
  });

  it(`create an teacher and get in database`, async () => {
    const input = {
      name: 'Test Teacher',
    };

    const response = await request(app.getHttpServer())
      .post('/teacher')
      .send(input);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: input.name,
      }),
    );

    const responseGet = await request(app.getHttpServer()).get(
      `/teacher/${response.body.id}`,
    );
    expect(responseGet.status).toBe(200);
    expect(responseGet.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: input.name,
      }),
    );
  });

  it(`update an teacher`, async () => {
    const input = {
      name: 'Test Teacher Updated',
    };
    const response = await request(app.getHttpServer())
      .post('/teacher')
      .send(input);
    const responseUpdate = await request(app.getHttpServer())
      .put(`/teacher/${response.body.id}`)
      .send({ name: 'Test Teacher Updated 2' });
    expect(responseUpdate.status).toBe(200);
    expect(responseUpdate.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: 'Test Teacher Updated 2',
      }),
    );
    const responseGet = await request(app.getHttpServer()).get(
      `/teacher/${response.body.id}`,
    );
    expect(responseGet.status).toBe(200);
    expect(responseGet.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: 'Test Teacher Updated 2',
      }),
    );
  });

  it(`delete an teacher`, async () => {
    const input = {
      name: 'Test Teacher to delete',
    };
    const response = await request(app.getHttpServer())
      .post('/teacher')
      .send(input);
    const responseDelete = await request(app.getHttpServer()).delete(
      `/teacher/${response.body.id}`,
    );
    expect(responseDelete.status).toBe(200);
    const responseGet = await request(app.getHttpServer()).get(
      `/teacher/${response.body.id}`,
    );
    expect(responseGet.status).toBe(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
