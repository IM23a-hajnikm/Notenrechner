import { IsOptional, IsNumber, IsString, Min, Max } from 'class-validator';

export class UpdateGradeDto {
    @IsOptional()
    @IsString()
    subject?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(6)
    grade?: number;

    @IsOptional()
    @IsString()
    semester?: string;
}
