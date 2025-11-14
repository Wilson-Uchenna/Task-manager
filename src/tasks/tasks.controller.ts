import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TasksService } from './providers/tasks/tasks.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatchTaskDto } from './dtos/patch-task.dto';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  // Define your task-related endpoints here

  @Get()
  public findAllTasks() {
    return this.taskService.findAll();
  }
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
  })
  @Post()
  public async createTask(@Body() createTaskDto: CreateTaskDto) {
    // Logic to create a new task
    await this.taskService.CreateTask(createTaskDto)

    return 'Task created successfully';

  }

  @ApiOperation({ summary: 'Update the task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
  })
  @Patch()
  public updateTask(@Body() patchTaskDto: PatchTaskDto) {
    // Logic to update an existing task
  }
}
