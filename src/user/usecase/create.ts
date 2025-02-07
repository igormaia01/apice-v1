import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { ForbiddenException } from '@nestjs/common';

import { User } from '../user.entity';

export class CreateAccess {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async execute(
    username: string,
    password: string,
  ): Promise<{
    id: string;
    username: string;
    created_at: Date;
  }> {
    const userExists = await this.userRepository.findOne({
      where: { username },
    });

    if (userExists) {
      throw new ForbiddenException('User already exists');
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const user = await this.userRepository.save({
      username,
      password: passwordHash,
    });

    return {
      id: user.id,
      username: user.username,
      created_at: user.created_at,
    };
  }
}
