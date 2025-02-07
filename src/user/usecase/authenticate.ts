import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import * as jsonwebtoken from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';

import { User } from '../user.entity';

export class Authenticate {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async execute(
    username: string,
    password: string,
  ): Promise<{ token: string; expiresIn: number }> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordIsValid = await bcryptjs.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const secret = String(process.env.SECRET);
    const token = jsonwebtoken.sign(
      { id: user.id, username: user.username },
      secret,
      {
        expiresIn: 3600,
      },
    );

    return { token, expiresIn: 3600 };
  }
}
