import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Subject } from '@subject/subject.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  subjectId: string;

  @Column({ type: 'float' })
  hours: number;

  @Column()
  deadline: Date;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Subject, (subject) => subject.activities)
  subject: Relation<Subject>;
}
