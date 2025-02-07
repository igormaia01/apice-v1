import { IsNotEmpty } from 'class-validator';

export class UpdateTeacherDTO {
  @IsNotEmpty()
  name: string;
}
