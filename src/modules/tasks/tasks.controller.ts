import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { Task } from './interfaces/task.interface';
import { TasksService } from './tasks.service';

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  addTask(@Body('description') newTask: string) {
    return this.tasksService.addTask(newTask);
  }

  @Patch()
  updateTask(@Body() updatedTask: Task) {
    return this.tasksService.updateTask(updatedTask);
  }

  @Delete()
  deleteTask(@Body('id') deleteTaskId: string) {
    this.tasksService.deleteTask(deleteTaskId);
    return `Task has been deleted`;
  }
}
