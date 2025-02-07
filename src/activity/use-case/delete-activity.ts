import { Repository } from 'typeorm';
import { Activity } from '@activity/activity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CalculateOverloadWhenRemoveActivityFromSubject } from '@overload/use-case/calculate-when-remove-activity-from-subject';

export class DeleteActivity {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    private readonly calculateOverloadWhenRemoveActivityFromSubject: CalculateOverloadWhenRemoveActivityFromSubject,
  ) {}

  async execute(id: string): Promise<void> {
    await this.calculateOverloadWhenRemoveActivityFromSubject.execute(id);
    await this.activityRepository.delete(id);
  }
}
