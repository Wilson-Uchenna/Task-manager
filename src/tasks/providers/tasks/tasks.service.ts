import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/tasks/dtos/create-task.dto';
import { Task } from 'src/tasks/task.entity';
import { Repository } from 'typeorm';
import { SlugifyProvider } from '../slugify.provider';
import { ConfigService } from '@nestjs/config';

/**
 * Service to manage tasks.
 */
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    private readonly slugifyProvider: SlugifyProvider,

    private readonly configService: ConfigService,
  ) {}

  public async getTaskById(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    return task;


  }
  /**
   * Retrieve all tasks.
   */
  public findAll() {
    // Logic to retrieve all tasks
    return this.taskRepository.find();
  }

  public async CreateTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const environment = this.configService.get<string>('NODE_ENV');
    console.log(`Current Environment: ${environment}`);
    const { title, description } = createTaskDto;

    try {
      const uniqueSlug = this.slugifyProvider.generateUniqueSlug(title);
      const data = { title, description, slug: uniqueSlug };

      const task = await this.taskRepository.create(data);

      console.log('Creating Task with data:', data);

      return await this.taskRepository.save(task);
    } catch (error) {
      console.log(error);

      if (error.code === '23505') {
        throw new BadRequestException('A task with this title already exists.');
      }

      throw new InternalServerErrorException(
        'An error occurred while creating the task.',
      );
    }
  }

  public async patchTask(id: number, patchTaskDto: Partial<Task>) {
    let task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new BadRequestException('Task not found');
    }

    if (patchTaskDto.title) {
      const uniqueSlug = await this.slugifyProvider.generateUniqueSlug(
        patchTaskDto.title,
      );
      task.slug = uniqueSlug;
    }

    task.title = patchTaskDto.title ?? task.title;
    task.description = patchTaskDto.description ?? task.description;
    task.status = patchTaskDto.status ?? task.status;

    try {
      return await this.taskRepository.save(task);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('A task with this title already exists.');
      }

      throw new InternalServerErrorException(
        'An error occurred while updating the task.',
      );
    }
  }

  public async deleteTask(id: number) {
    let task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new BadRequestException('Task not found');
    }

    await this.taskRepository.delete(id);

    return { message: 'Task deleted successfully', id };
  }
}
