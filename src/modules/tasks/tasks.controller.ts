import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/updateTask.dto';

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
  addTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.addTask(createTaskDto);
  }

  @Patch(':id')
  updateTask(@Body() updatedTask: UpdateTaskDto) {
    return this.tasksService.updateTask(updatedTask);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTask(id);
    return `Task has been deleted`;
  }
}
