import { IsNotEmpty } from 'class-validator';

export class CreateTeacherDTO {
  @IsNotEmpty()
  name: string;
}
