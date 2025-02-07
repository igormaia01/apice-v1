import { Body, Controller, Post } from '@nestjs/common';

import { CreateAccess } from './usecase/create';
import { CreateUserDTO } from './dto/create-user';
import { Authenticate } from './usecase/authenticate';

@Controller('user')
export class UserController {
  constructor(
    private readonly createAccess: CreateAccess,
    private readonly authenticate: Authenticate,
  ) {}

  @Post()
  async create(@Body() user: CreateUserDTO) {
    return await this.createAccess.execute(user.username, user.password);
  }

  @Post('authenticate')
  async auth(@Body() user: CreateUserDTO) {
    return await this.authenticate.execute(user.username, user.password);
  }
}
