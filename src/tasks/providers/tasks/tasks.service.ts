import { Injectable } from '@nestjs/common';
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
    const {title, description }= createTaskDto;



    const uniqueSlug = await this.slugifyProvider.generateUniqueSlug<Task>(
      this.taskRepository,
      title,
      'slug'
    );

    
     const task = this.taskRepository.create({
      title,
      description,
      slug: uniqueSlug,
    });

    return this.taskRepository.save(task);


  }
}
