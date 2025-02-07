import { Overload } from '@overload/overload.entity';
import { Subject } from '@subject/subject.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Subject, (subject) => subject.students, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  subjects?: Relation<Subject>[];

  @OneToMany(() => Overload, (overload) => overload.student, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  overloads: Relation<Overload>[];
}
