import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks = [];

  getTasks(getTasksFilterDto: GetTasksFilterDto): Task[] {
    if (!getTasksFilterDto) {
      return this.getAllTasks();
    }

    const { status, search } = getTasksFilterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id): Task {
    const found = this.tasks.find(task => task.id === id);
    if (!found) {
      throw new NotFoundException('Invalid id for the task');
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { description, title } = createTaskDto;
    const newTask = {
      id: uuid(),
      description,
      title,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task | null {
    const task = this.getTaskById(id);
    if (!task) {
      return null;
    }
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
