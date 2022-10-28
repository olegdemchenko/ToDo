import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { CreateTask } from './dto/create-task.dto';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: '1', description: 'First task' },
    { id: '2', description: 'Second task' },
    { id: '3', description: 'Third task' },
  ];

  getAllTasks() {
    return this.tasks;
  }

  addTask(taskDescription: string) {
    const newTask = new CreateTask(_.uniqueId(), taskDescription);
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter(({ id }) => id !== taskId);
  }

  updateTask(updatedTask: Task) {
    this.tasks = this.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );
    return updatedTask;
  }
}
