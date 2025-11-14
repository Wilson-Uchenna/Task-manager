import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class PatchTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: 'The ID of the post that needs to be updated',
  })
  @IsInt() 
  @IsNotEmpty()
  id: number;
}
