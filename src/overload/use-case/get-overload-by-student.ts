import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Overload } from '../overload.entity';

export class GetOverloadByStudent {
  constructor(
    @InjectRepository(Overload)
    private readonly overloadRepository: Repository<Overload>,
  ) {}

  async execute(studentId: string): Promise<Overload[]> {
    const overloads = await this.overloadRepository.find({
      where: {
        studentId,
        year: new Date().getFullYear(),
      },
      order: {
        month: 'ASC',
      },
    });

    return overloads;
  }
}
