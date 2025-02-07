import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OverloadModule } from '@overload/overload.module';

import { ActivityController } from './activity.controller';
import { Activity } from './activity.entity';
import { CreateActivity } from './use-case/create-activity';
import { UpdateActivity } from './use-case/update-activity';
import { GetActivityById } from './use-case/get-activity-by-id';
import { GetAllActivity } from './use-case/get-all-activity';
import { DeleteActivity } from './use-case/delete-activity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity]), OverloadModule],
  controllers: [ActivityController],
  providers: [
    CreateActivity,
    UpdateActivity,
    GetActivityById,
    GetAllActivity,
    DeleteActivity,
  ],
  exports: [],
})
export class ActivityModule {}
