import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  UseGuards,
  Session,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/createTask.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllTasks(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1;
    return this.tasksService.getAllTasks();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getTask(@Param('id') id: string) {
    return this.tasksService.getTask(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.addTask(createTaskDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async updateTask(@Body() updatedTask: UpdateTaskDto) {
    return this.tasksService.updateTask(updatedTask);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
