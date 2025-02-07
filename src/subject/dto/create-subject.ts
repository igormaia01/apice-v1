import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSubjectDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  teacherId: string;
}
