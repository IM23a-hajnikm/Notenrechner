import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GradesModule } from './grades/grades.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true, // Make ConfigModule available globally
      }),
      TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // Ensure this matches your MySQL username
      password: 'Samko123', // Ensure this matches your MySQL password
      database: 'grade_notebook', // Ensure this matches your database name
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Ensure the schema is updated in development
    }),
    UsersModule,
    GradesModule,
  ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
