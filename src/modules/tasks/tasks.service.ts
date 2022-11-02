import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { CreateTask } from './dto/create-task.dto';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      description: 'First task',
      active: true,
    },
    {
      description: 'Second task',
      active: true,
    },
    {
      description: 'Third task',
      active: true,
    },
    {
      description: 'Fourth task',
      active: true,
    },
    {
      description: 'Fifth task',
      active: true,
    },
  ].map((task) => ({ id: _.uniqueId(), ...task }));

  getAllTasks() {
    return this.tasks;
  }

  getTask(taskId: string) {
    const task = this.tasks.find(({ id }) => taskId === id);
    return task;
  }

  addTask(taskDescription: string) {
    const newTask = new CreateTask(_.uniqueId(), taskDescription, true);
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
