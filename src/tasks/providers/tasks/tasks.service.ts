import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/tasks/dtos/create-task.dto';
import { Task } from 'src/tasks/task.entity';
import { Repository } from 'typeorm';
import slugify from 'slugify';
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
      const uniqueSlug = await this.slugifyProvider.generateUniqueSlug(title);

      const task = await this.taskRepository.create({
        title,
        description,
        slug: uniqueSlug,
      });

      console.log('Generated Slug:', uniqueSlug);

      return await this.taskRepository.save(task);

    } catch (error) {
      console.log(error.code);
      
      if (error.code === '23505') {
        throw new BadRequestException('A task with this title already exists.');
      }

      throw new InternalServerErrorException(
        'An error occurred while creating the task.',
      );
    }
  }
}
