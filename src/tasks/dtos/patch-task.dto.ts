import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class PatchTaskDto extends PartialType(CreateTaskDto) {}
