import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TaskStatus } from '../enums/taskStatus.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    description: 'Title of the task',
    example: 'Complete project documentation',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @IsOptional()
  @MaxLength(255)
  @ApiPropertyOptional({
    description: 'Detailed description of the task',
    example:
      'Write comprehensive documentation for the new project including setup instructions, usage guidelines, and API references.',
  })
  description?: string;


  @IsEnum(TaskStatus)
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    enum: TaskStatus,
    description: 'Status of the task',
    example: TaskStatus.PENDING,
  })
  status?: TaskStatus;
}
