import { Teacher } from '@teacher/teacher.entity';
import { Activity } from '@activity/activity.entity';
import { Student } from '@student/student.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Activity, (activity) => activity.subject)
  activities: Relation<Activity>[];

  @ManyToMany(() => Student, (student) => student.subjects)
  students: Relation<Student>[];

  @ManyToOne(() => Teacher, (teacher) => teacher.subjects)
  teacher: Relation<Teacher>;

  @Column({ type: 'uuid' })
  teacherId?: string;
}
