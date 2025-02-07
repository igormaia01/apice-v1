import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/student.entity';
import { Subject } from 'src/subject/subject.entity';
import { Activity } from 'src/activity/activity.entity';
import { Teacher } from 'src/teacher/teacher.entity';
import { ConfigModule } from '@nestjs/config';
import { Overload } from 'src/overload/overload.entity';
import { UserModule } from '@user/user.module';
import { faker } from '@faker-js/faker';
import { User } from '@user/user.entity';

describe('user', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        UserModule,
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
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  const user = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };

  it(`create user`, async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      username: user.username,
      id: expect.any(String),
      created_at: expect.any(String),
    });
  });

  it('authenticate user', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/authenticate')
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      expiresIn: 3600,
      token: expect.any(String),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
