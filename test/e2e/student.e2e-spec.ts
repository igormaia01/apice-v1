import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from 'src/student/student.module';
import { Student } from 'src/student/student.entity';
import { Subject } from 'src/subject/subject.entity';
import { Activity } from 'src/activity/activity.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { Overload } from 'src/overload/overload.entity';
import { User } from '@user/user.entity';
import { faker } from '@faker-js/faker';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
// todo arrumar test end to end
describe('Students', () => {
  let app: INestApplication;
  const user = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        StudentModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT as string),
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          entities: [Student, Subject, Activity, Teacher, Overload, User],
          synchronize: true,
        }),
      ],
      providers: [AuthMiddleware],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.use(await app.resolve(AuthMiddleware));
    await app.init();

    await request(app.getHttpServer()).post('/user').send(user);
  });

  it(`get all students`, async () => {
    const userAuthenticate = await request(app.getHttpServer())
      .post('/user/authenticate')
      .send(user);
    const response = await request(app.getHttpServer())
      .get('/student')
      .set({
        Authorization: `Bearer ${userAuthenticate.body.token}`,
      });

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

  it.only(`create an student and get in database`, async () => {
    const userAuthenticate = await request(app.getHttpServer())
      .post('/user/authenticate')
      .send(user);
    const input = {
      name: 'Test Student',
    };
    console.log(`token`, userAuthenticate.body.token);
    const response = await request(app.getHttpServer())
      .post('/student')
      .set({
        Authorization: `Bearer ${userAuthenticate.body.token}`,
      })
      .send(input);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: input.name,
      }),
    );
    const responseGet = await request(app.getHttpServer())
      .get(`/student/${response.body.id}`)
      .set({
        Authorization: `Bearer ${userAuthenticate.body.token}`,
      });
    expect(responseGet.status).toBe(200);
    expect(responseGet.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: input.name,
      }),
    );
  });

  it(`update an student`, async () => {
    const userAuthenticate = await request(app.getHttpServer())
      .post('/user/authenticate')
      .send(user);
    const input = {
      name: 'Test Student Updated',
    };
    const response = await request(app.getHttpServer())
      .post('/student')
      .set({
        Authorization: `Bearer ${userAuthenticate.body.token}`,
      })
      .send(input);
    expect(response.status).toBe(201);
    const responseUpdate = await request(app.getHttpServer())
      .put(`/student/${response.body.id}`)
      .set({
        Authorization: `Bearer ${userAuthenticate.body.token}`,
      })
      .send({ name: 'Test Student Updated 2' });
    expect(responseUpdate.status).toBe(200);
    expect(responseUpdate.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: 'Test Student Updated 2',
      }),
    );
  });

  it(`delete an student`, async () => {
    const userAuthenticate = await request(app.getHttpServer())
      .post('/user/authenticate')
      .send(user);
    const input = {
      name: 'Test Student to delete',
    };
    const response = await request(app.getHttpServer())
      .post('/student')
      .set({
        Authorization: `Bearer ${userAuthenticate.body.token}`,
      })
      .send(input);
    expect(response.status).toBe(201);
    const responseDelete = await request(app.getHttpServer())
      .delete(`/student/${response.body.id}`)
      .set({
        Authorization: `Bearer ${userAuthenticate.body.token}`,
      });
    expect(responseDelete.status).toBe(200);
    const responseGet = await request(app.getHttpServer())
      .get(`/student/${response.body.id}`)
      .set({
        Authorization: `Bearer ${userAuthenticate.body.token}`,
      });
    expect(responseGet.status).toBe(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
