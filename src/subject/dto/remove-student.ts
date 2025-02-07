import { IsNotEmpty, IsUUID } from 'class-validator';

export class RemoveStudentDTO {
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @IsUUID()
  @IsNotEmpty()
  subjectId: string;
}
