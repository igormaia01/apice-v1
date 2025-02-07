import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStudentDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
