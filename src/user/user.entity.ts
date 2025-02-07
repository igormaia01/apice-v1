import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

import { Student } from '../student/student.entity';
import { Teacher } from '../teacher/teacher.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'uuid', nullable: true })
  studentId?: string | null;

  @Column({ type: 'uuid', nullable: true })
  teacherId?: string | null;

  @OneToOne(() => Student, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  student?: Relation<Student>;

  @OneToOne(() => Teacher)
  @JoinColumn()
  teacher?: Relation<Teacher>;
}
