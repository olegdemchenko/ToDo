import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
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

  addTask(createTaskDto: CreateTaskDto) {
    const newTask = { id: _.uniqueId(), ...createTaskDto };
    this.tasks.push({ id: _.uniqueId(), ...createTaskDto });
    return newTask;
  }

  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter(({ id }) => id !== taskId);
    return this.tasks;
  }

  updateTask(updatedTask: Task) {
    this.tasks = this.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );
    return updatedTask;
  }
}
