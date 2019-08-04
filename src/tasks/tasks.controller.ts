import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  NotFoundException,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusValidationPipe } from './pipes/update-task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getTasks(@Query() getTasksFilterDto: GetTasksFilterDto): Task[] {
    return this.tasksService.getTasks(getTasksFilterDto);
  }

  @Get('/:id')
  getTask(@Param() param): Task {
    const { id } = param;
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id,
    @Body('status', UpdateTaskStatusValidationPipe)
    status,
  ): Task {
    const result: Task | null = this.tasksService.updateTaskStatus(id, status);

    if (result === null) {
      throw new NotFoundException('Invalid task id');
    }

    return result;
  }

  @Delete('/:id')
  deleteTask(@Param() param) {
    const { id } = param;
    return this.tasksService.deleteTask(id);
  }
}
