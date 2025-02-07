import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateSubjectDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsUUID()
  @IsOptional()
  teacherId: string;
}
