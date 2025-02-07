import { Repository } from 'typeorm';
import { Activity } from '@activity/activity.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class GetAllActivity {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async execute(): Promise<Activity[]> {
    return this.activityRepository.find();
  }
}
