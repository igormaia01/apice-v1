import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { StudentModule } from './student/student.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { Student } from './student/student.entity';
import { Subject } from './subject/subject.entity';
import { SubjectModule } from './subject/subject.module';
import { ActivityModule } from './activity/activity.module';
import { Activity } from './activity/activity.entity';
import { TeacherModule } from './teacher/teacher.module';
import { Teacher } from './teacher/teacher.entity';
import { OverloadModule } from './overload/overload.module';
import { Overload } from './overload/overload.entity';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
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
    SubjectModule,
    ActivityModule,
    TeacherModule,
    OverloadModule,
    UserModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(AuthMiddleware)
      .exclude('user', 'user/authenticate')
      .forRoutes('*');
  }
}
