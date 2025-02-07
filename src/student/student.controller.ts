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
import { CreateStudentDTO } from '@student/dto/create-student';
import { UpdateStudentDTO } from '@student/dto/update-student';
import { Session } from '@user/user.decorator';
import { User } from '@user/user.entity';

import { CreateStudent } from './use-case/create-student';
import { GetStudentById } from './use-case/get-student-by-id';
import { UpdateStudent } from './use-case/update-student';
import { DeleteStudent } from './use-case/delete-student';
import { GetAllStudent } from './use-case/get-all-student';

@Controller('student')
export class StudentController {
  constructor(
    private readonly createStudent: CreateStudent,
    private readonly updateStudent: UpdateStudent,
    private readonly deleteStudent: DeleteStudent,
    private readonly getAllStudent: GetAllStudent,
    private readonly getStudentById: GetStudentById,
  ) {}

  @Post()
  async create(
    @Session() session: User,
    @Body() createStudentDTO: CreateStudentDTO,
  ) {
    return this.createStudent.execute(createStudentDTO, session);
  }

  @Get()
  async findAll() {
    return this.getAllStudent.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getStudentById.execute(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateStudent: UpdateStudentDTO,
  ) {
    return this.updateStudent.execute(id, updateStudent);
  }

  @Delete(':id')
  remove(@Session() session: User, @Param('id') id: string) {
    return this.deleteStudent.execute(id, session.id);
  }
}
