import { IsOptional, IsNumber } from 'class-validator';

export class UpdateGradeDto {
    @IsOptional()
    @IsNumber()
    subjectId?: number; // subject as an ID

    @IsOptional()
    @IsNumber()
    value?: number; // matching the entity property name

    @IsOptional()
    @IsNumber()
    weight: number;     // if needed

    @IsOptional()
    @IsNumber()
    termId?: number; // matching the entity's term_id
}