class Task {
  title: string;
  description: string;
  id: string;
  status: TaskStatus;
}

enum TaskStatus {
  'OPEN' = 'OPEN',
  'IN_PROGRESS' = 'IN_PROGRESS',
  'DONE' = 'DONE',
}

export { Task, TaskStatus };
