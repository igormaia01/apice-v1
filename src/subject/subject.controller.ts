import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateSubjectDTO } from '@subject/dto/update-subject';
import { CreateSubjectDTO } from '@subject/dto/create-subject';
import { AddStudentDTO } from '@subject/dto/add-student';
import { AddStudentInSubject } from '@subject/use-case/add-student-in-subject';
import { CreateSubject } from '@subject/use-case/create-subject';

import { UpdateSubject } from './use-case/update-subject';
import { GetAllSubject } from './use-case/get-all-subject';
import { GetSubjectById } from './use-case/get-subject-by-id';
import { DeleteSubject } from './use-case/delete-subject';
import { RemoveStudentDTO } from './dto/remove-student';
import { RemoveStudentFromSubject } from './use-case/remove-student-from-subject';

@Controller('subject')
export class SubjectController {
  constructor(
    private readonly addStudentInSubject: AddStudentInSubject,
    private readonly createSubject: CreateSubject,
    private readonly updateSubject: UpdateSubject,
    private readonly getAllSubject: GetAllSubject,
    private readonly getSubjectById: GetSubjectById,
    private readonly deleteSubject: DeleteSubject,
    private readonly removeStudentFromSubject: RemoveStudentFromSubject,
  ) {}

  @Post()
  async create(@Body() subject: CreateSubjectDTO) {
    return this.createSubject.execute(subject);
  }

  @Get()
  async findAll() {
    return this.getAllSubject.execute();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.getSubjectById.execute(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() subject: UpdateSubjectDTO,
  ) {
    return this.updateSubject.execute(id, subject);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.deleteSubject.execute(id);
  }

  @Patch('add-student')
  addStudent(@Body() data: AddStudentDTO) {
    return this.addStudentInSubject.execute(data.studentId, data.subjectId);
  }

  @Patch('remove-student')
  deleteStudent(@Body() data: RemoveStudentDTO) {
    return this.removeStudentFromSubject.execute(
      data.studentId,
      data.subjectId,
    );
  }
}
