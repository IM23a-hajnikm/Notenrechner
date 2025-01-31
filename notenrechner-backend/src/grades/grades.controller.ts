import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    UseGuards,
    Req
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GradesService } from './grades.service';
import { Grade } from './grade.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Request } from 'express';

interface RequestWithUser extends Request {
    user: { id: number; email: string };
}

@Controller('grades')
@UseGuards(JwtAuthGuard)
export class GradesController {
    constructor(private readonly gradesService: GradesService) {}

    // Create a new grade
    @Post()
    create(@Req() req: RequestWithUser, @Body() createGradeDto: CreateGradeDto) {
        return this.gradesService.create(req.user.id, createGradeDto);
    }

    // Get all grades
    @Get()
    findAll(@Req() req: RequestWithUser) {
        return this.gradesService.findAllByUser(req.user.id);
    }

    // Get all grades for a specific user
    @Get('user/:userId')
    getGradesByUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.gradesService.findByUser(userId);
    }

    // Update a specific grade
    @Put(':id')
    async updateGrade(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateGradeDto: UpdateGradeDto,
    ): Promise<Grade> {
        return this.gradesService.update(id, updateGradeDto);
    }

    // Delete a specific grade
    @Delete(':id')
    async deleteGrade(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.gradesService.delete(id);
    }
}
