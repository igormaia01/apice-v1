import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
