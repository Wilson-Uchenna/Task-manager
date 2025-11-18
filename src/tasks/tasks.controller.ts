import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Put,
  Body,
  Param,
  ParseIntPipe,
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

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully retrieved.',
  })
  public async getTaskById(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.getTaskById(id);
  }

  @ApiOperation({ summary: 'Retrieve all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of all tasks retrieved successfully.',
  })
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
    return await this.taskService.CreateTask(createTaskDto);
  }

  @ApiOperation({ summary: 'Update the task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
  })
  @Patch(':id')
  public async updateTask(
    @Body() patchTaskDto: PatchTaskDto,
    @Param('id') id: number,
  ) {
    return await this.taskService.patchTask(id, patchTaskDto);
    // Logic to update an existing task
  }

  @ApiOperation({ summary: 'Mark status as completed' })

  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
  })
  @Delete(':id')
  public deleteTask(@Param('id') id: number) {
    // Logic to delete a task
    return this.taskService.deleteTask(id);
  }
}
