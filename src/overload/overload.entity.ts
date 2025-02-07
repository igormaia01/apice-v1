import { Student } from '@student/student.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Overload {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column('float', { array: true })
  days: number[];

  @Column('uuid')
  studentId: string;

  @ManyToOne(() => Student, (student) => student.overloads, {
    onDelete: 'CASCADE',
  })
  student: Relation<Student>;
}
