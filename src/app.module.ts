import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const ENV = process.env.NODE_ENV;

console.log('ENV FILE PATH:', !ENV ? '.env' : `.env.${ENV}`);


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('NODE_ENV:', process.env.NODE_ENV);
        console.log(
          'DATABASE_PASSWORD:',
          configService.get('DATABASE_PASSWORD'),
        );
        console.log('TYPE:', typeof configService.get('DATABASE_PASSWORD'));


        return {
          type: 'postgres',
          entities: [Task],
          synchronize: true,
          autoLoadEntities: true,
          port: +configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          host: configService.get('DATABASE_HOST'),
          database: configService.get('DATABASE_NAME'),
        };
      },
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ConfigModule],
})
export class AppModule {}
