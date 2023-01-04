import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/createTask.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/updateTask.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(@Request() req: any) {
    return this.tasksService.getAllTasks(req.user.userId);
  }

  @Get(':id')
  async getTask(@Param('id') id: string) {
    return this.tasksService.getTask(id);
  }

  @Post()
  async addTask(@Request() req: any, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.addTask(createTaskDto, req.user.userId);
  }

  @Patch()
  async updateTask(@Body() updatedTask: UpdateTaskDto) {
    return this.tasksService.updateTask(updatedTask);
  }

  @Delete(':id')
  async deleteTask(@Request() req: any, @Param('id') id: string) {
    return this.tasksService.deleteTask(id, req.user.userId);
  }
}
