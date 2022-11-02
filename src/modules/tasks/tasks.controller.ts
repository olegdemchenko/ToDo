import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { Task } from './interfaces/task.interface';
import { TasksService } from './tasks.service';

@Controller()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.tasksService.getTask(id);
  }

  @Post()
  addTask(@Body('description') newTask: string) {
    return this.tasksService.addTask(newTask);
  }

  @Patch(':id')
  updateTask(@Body() updatedTask: Task) {
    return this.tasksService.updateTask(updatedTask);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTask(id);
    return `Task has been deleted`;
  }
}
