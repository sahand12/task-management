import { TaskStatus } from '../task.model';
import { IsIn, IsOptional } from 'class-validator';

class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.OPEN])
  status: TaskStatus;

  @IsOptional() search: string;
}

export { GetTasksFilterDto };
