import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './grade.entity';
import { CreateGradeDto } from './dto/create-grade.dto';

@Injectable()
export class GradesService {
    constructor(
        @InjectRepository(Grade)
        private readonly gradesRepository: Repository<Grade>,
    ) {}

    // Create a new grade
    async create(userId: number, createGradeDto: CreateGradeDto): Promise<Grade> {
        const grade = this.gradesRepository.create({
            ...createGradeDto,
            userId,
        });
        return this.gradesRepository.save(grade);
    }

    // Get all grades
    async findAll(): Promise<Grade[]> {
        return await this.gradesRepository.find();
    }

    // Get all grades for a specific user
    async findByUser(userId: number): Promise<Grade[]> {
        return this.gradesRepository.find({
            where: { userId },
            relations: ['user'],
        });
    }

    findAllByUser = this.findByUser;

    // Update a specific grade
    async update(id: number, grade: Partial<Grade>): Promise<Grade> {
        await this.gradesRepository.update(id, grade);
        return this.gradesRepository.findOne({ where: { id } });
    }

    // Delete a specific grade
    async delete(id: number): Promise<void> {
        await this.gradesRepository.delete(id);
    }
}
