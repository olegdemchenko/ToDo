import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as _ from 'lodash';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_MODEL')
    private taskModel: Model<Task>,
  ) {}

  async getAllTasks() {
    return this.taskModel.find();
  }

  async getTask(id: string) {
    return this.taskModel.findById(id);
  }

  async addTask(createTaskDto: CreateTaskDto) {
    return this.taskModel.create(createTaskDto);
  }

  async deleteTask(id: string) {
    await this.taskModel.findByIdAndDelete(id);
    return this.getAllTasks();
  }

  async updateTask(updatedTask: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(
      updatedTask._id,
      _.pick(updatedTask, ['description', 'active']),
      { new: true },
    );
  }
}
