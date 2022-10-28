import { Task } from '../interfaces/task.interface';

export class CreateTask implements Task {
  constructor(public id: string, public description: string) {}
}
