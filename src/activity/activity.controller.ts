import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreateActivityDTO } from './dto/create-activity';
import { UpdateActivityDTO } from './dto/update-activity';
import { CreateActivity } from './use-case/create-activity';
import { UpdateActivity } from './use-case/update-activity';
import { GetActivityById } from './use-case/get-activity-by-id';
import { GetAllActivity } from './use-case/get-all-activity';
import { DeleteActivity } from './use-case/delete-activity';

@Controller('activity')
export class ActivityController {
  constructor(
    private readonly createActivity: CreateActivity,
    private readonly updateActivity: UpdateActivity,
    private readonly getActivityById: GetActivityById,
    private readonly getAllActivity: GetAllActivity,
    private readonly deleteActivity: DeleteActivity,
  ) {}

  @Post()
  async create(@Body() createActivityDTO: CreateActivityDTO) {
    return this.createActivity.execute(createActivityDTO);
  }

  @Get()
  async findAll() {
    return this.getAllActivity.execute();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.getActivityById.execute(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateActivity: UpdateActivityDTO,
  ) {
    return this.updateActivity.execute(id, updateActivity);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.deleteActivity.execute(id);
  }
}
