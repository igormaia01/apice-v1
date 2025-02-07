import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class UpdateActivityDTO {
  @IsOptional()
  @IsUUID()
  subjectId: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  hours: number;

  @IsOptional()
  @IsDateString()
  deadline: Date;
}
