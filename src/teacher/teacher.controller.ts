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
import { CreateTeacherDTO } from '@teacher/dto/create-teacher';
import { UpdateTeacherDTO } from '@teacher/dto/update-teacher';
import { Session } from '@user/user.decorator';
import { User } from '@user/user.entity';

import { CreateTeacher } from './usecase/create-teacher';
import { UpdateTeacher } from './usecase/update-teacher';
import { DeleteTeacher } from './usecase/delete-teacher';
import { GetTeacherById } from './usecase/get-teacher-by-id';
import { GetAllTeacher } from './usecase/get-all-teacher';

@Controller('teacher')
export class TeacherController {
  constructor(
    private readonly createTeacher: CreateTeacher,
    private readonly updateTeacher: UpdateTeacher,
    private readonly deleteTeacher: DeleteTeacher,
    private readonly getTeacherById: GetTeacherById,
    private readonly getAllTeacher: GetAllTeacher,
  ) {}

  @Post()
  async create(@Session() session: User, @Body() teacher: CreateTeacherDTO) {
    return await this.createTeacher.execute(teacher, session);
  }

  @Get()
  async findAll() {
    return await this.getAllTeacher.execute();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.getTeacherById.execute(id);
  }

  @Delete(':id')
  async remove(
    @Session() session: User,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.deleteTeacher.execute(id, session.id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() teacher: UpdateTeacherDTO,
  ) {
    return await this.updateTeacher.execute(id, teacher);
  }
}
