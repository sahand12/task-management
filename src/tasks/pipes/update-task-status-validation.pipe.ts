import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../task.model';

@Injectable()
class UpdateTaskStatusValidationPipe implements PipeTransform {
  readonly statuses = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(
        `${value} is not valid for task status; it must be in ${this.statuses}`,
      );
    }

    return value;
  }

  private isStatusValid(status) {
    return this.statuses.includes(status);
  }
}

export { UpdateTaskStatusValidationPipe };
