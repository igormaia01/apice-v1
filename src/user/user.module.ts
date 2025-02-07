import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { User } from './user.entity';
import { CreateAccess } from './usecase/create';
import { Authenticate } from './usecase/authenticate';
import { SetTeacher } from './usecase/setTeacher';
import { SetStudent } from './usecase/setStudent';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [CreateAccess, Authenticate, SetTeacher, SetStudent],
  exports: [SetTeacher, SetStudent],
})
export class UserModule {}
