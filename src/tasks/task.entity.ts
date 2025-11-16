import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { TaskStatus } from '../tasks/enums/taskStatus.enum';
import slugify from 'slugify';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false
  })
    slug: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
  }
}
