import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './providers/tasks/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskProviderTs } from './providers/create-task.provider.ts';
import { SlugifyProvider } from './providers/slugify.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService, CreateTaskProviderTs, SlugifyProvider]
})
export class TasksModule {
  
}
