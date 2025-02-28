import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './grade.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Injectable()
export class GradesService {
    constructor(
        @InjectRepository(Grade)
        private readonly gradesRepository: Repository<Grade>,
    ) {}

    async update(id: number, updateGradeDto: UpdateGradeDto): Promise<Grade> {
        const grade = await this.gradesRepository.findOne({ where: { id } });
        if (!grade) {
            throw new NotFoundException('Grade not found');
        }

        // Map DTO fields to the entity:
        if (updateGradeDto.subjectId !== undefined) {
            // If your Subject entity is already set up, you can assign a partial:
            grade.subject = { id: updateGradeDto.subjectId } as any; // or cast as Subject
        }
        if (updateGradeDto.value !== undefined) {
            grade.value = updateGradeDto.value;
        }
        if (updateGradeDto.termId !== undefined) {
            grade.term_id = updateGradeDto.termId;
        }

        return this.gradesRepository.save(grade);
    }


    // Create a new grade
    async create(userId: number, createGradeDto: CreateGradeDto): Promise<Grade> {
        // Map the incoming DTO fields to match your Grade entity fields
        const partialGrade: Partial<Grade> = {
            // If your entity uses 'value' for the numeric grade:
            value: createGradeDto.value,
            // If you store a weight for the grade:
            weight: createGradeDto.weight,
            // If you have a term_id column:
            term_id: createGradeDto.termId,
            // Here’s how you set the user relation by ID:
            user: { id: userId } as any,
            // If your entity uses a subject relation by subjectId:
            subject: createGradeDto.subjectId ? ({ id: createGradeDto.subjectId } as any) : undefined,
        };

        const grade = this.gradesRepository.create(partialGrade);
        return this.gradesRepository.save(grade);
    }

    // Get all grades
    async findAll(): Promise<Grade[]> {
        return await this.gradesRepository.find();
    }

    // Get all grades for a specific user
    async findByUser(userId: number): Promise<Grade[]> {
        return this.gradesRepository.find({
            where: { user: { id: userId } }, // no direct userId property
            relations: ['user', 'subject'],  // so you can access user or subject data
        });
    }


    findAllByUser = this.findByUser;

    // Update a specific grade

    // Delete a specific grade
    async delete(id: number): Promise<void> {
        await this.gradesRepository.delete(id);
    }
}
