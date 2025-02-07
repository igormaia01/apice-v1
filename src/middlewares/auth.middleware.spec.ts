import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NextFunction, Response } from 'express';
import { UnauthorizedException } from '@nestjs/common';

import { User } from '../user/user.entity';
import { createMockRepository } from '../test/mock-repository';
import { userFixture } from '../user/user-fixture';

import { AuthMiddleware, CustomRequest } from './auth.middleware';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;

  const userRepository = createMockRepository<User>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthMiddleware,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
      ],
    }).compile();

    middleware = module.get<AuthMiddleware>(AuthMiddleware);
  });

  it('should throw error if authorization is not provided', () => {
    const req = { headers: {}, user: userFixture() } as CustomRequest;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    expect(() => middleware.use(req, res, next)).rejects.toThrow(
      new UnauthorizedException('Unauthorized'),
    );
  });
});
