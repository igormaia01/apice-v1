import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user.entity';

export class SetTeacher {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(userId: string, teacherId: string): Promise<void> {
    this.userRepository.update(userId, {
      teacherId,
    });
  }
}
