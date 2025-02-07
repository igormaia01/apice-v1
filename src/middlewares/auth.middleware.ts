import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

import { User } from '../user/user.entity';

export interface CustomRequest extends Request {
  user: User;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async use(req: CustomRequest, _res: Response, next: NextFunction) {
    try {
      console.log(`auth middleware`);
      const { authorization } = req.headers;
      console.log(authorization);
      if (!authorization) {
        throw new UnauthorizedException('Unauthorized');
      }

      const [, token] = authorization.split(' ');

      const secret = String(process.env.SECRET);
      const dados: JwtPayload = jsonwebtoken.verify(
        token,
        secret,
      ) as JwtPayload;

      const { id, username } = dados;
      console.log(dados);
      console.log(`auth middleware`, id, username);
      const user = await this.userRepository.findOne({
        where: {
          id,
          username,
        },
      });
      console.log(user);
      if (!user) {
        throw new UnauthorizedException('Unauthorized');
      }
      req.user = user;
      return next();
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
