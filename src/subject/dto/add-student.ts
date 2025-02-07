import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddStudentDTO {
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @IsUUID()
  @IsNotEmpty()
  subjectId: string;
}
