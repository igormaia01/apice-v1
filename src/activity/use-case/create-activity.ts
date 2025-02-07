import { Repository } from 'typeorm';
import { CalculateOverloadWhenAddActivityInSubject } from '@overload/use-case/calculate-when-add-activity-in-subject';
import { Activity } from '@activity/activity.entity';
import { CreateActivityDTO } from '@activity/dto/create-activity';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';

export class CreateActivity {
  constructor(
    private readonly calculateOverloadWhenAddActivityInSubject: CalculateOverloadWhenAddActivityInSubject,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async execute(activity: CreateActivityDTO): Promise<Activity> {
    const activityCreated = await this.activityRepository.save({
      ...activity,
      created_at: DateTime.local().toJSDate(),
    });
    await this.calculateOverloadWhenAddActivityInSubject.execute(
      activityCreated.id,
    );
    return activityCreated;
  }
}
