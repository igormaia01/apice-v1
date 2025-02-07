import { Repository } from 'typeorm';
import { Activity } from '@activity/activity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

export class GetActivityById {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async execute(id: string): Promise<Activity> {
    const activity = await this.activityRepository.findOne({ where: { id } });
    if (activity) {
      return activity;
    }
    throw new NotFoundException('Activity not found');
  }
}
