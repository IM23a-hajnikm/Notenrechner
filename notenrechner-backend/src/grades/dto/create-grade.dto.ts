import { IsNotEmpty, IsNumber, IsString, Min, Max  } from 'class-validator';

export class CreateGradeDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    subject: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(6)
    grade: number; // Assuming grades are between 1 and 6

    @IsNotEmpty()
    @IsString()
    semester: string;
}
