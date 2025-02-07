import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateActivityDTO {
  @IsNotEmpty()
  @IsUUID()
  subjectId: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  hours: number;

  @IsNotEmpty()
  @IsDateString()
  deadline: Date;

  @IsNotEmpty()
  @IsString()
  title: string;
}
