import { Repository } from 'typeorm';
import { Activity } from '@activity/activity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateActivityDTO } from '@activity/dto/update-activity';
import { CalculateOverloadWhenUpdateActivityHours } from '@overload/use-case/calculate-overload-when-update-activity-hours';

export class UpdateActivity {
  constructor(
    private readonly calculateOverloadWhenUpdateActivityHours: CalculateOverloadWhenUpdateActivityHours,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async execute(
    id: string,
    activityDataToUpdate: UpdateActivityDTO,
  ): Promise<Activity> {
    const activity = await this.activityRepository.findOneByOrFail({ id });
    await this.activityRepository.update(id, activityDataToUpdate);
    if (activityDataToUpdate.hours !== activity.hours) {
      await this.calculateOverloadWhenUpdateActivityHours.execute(
        id,
        activity.hours,
        activityDataToUpdate.hours,
      );
    }
    return this.activityRepository.findOneByOrFail({ id });
  }
}
