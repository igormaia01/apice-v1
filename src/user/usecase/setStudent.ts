import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user.entity';

export class SetStudent {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(userId: string, studentId: string): Promise<void> {
    this.userRepository.update(userId, {
      studentId,
    });
  }
}
