import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be 8 or more characters long' })
    password: string;

    @IsString()
    @IsEnum(['teacher', 'student'], { message: 'Role must be either teacher or student' })
    role: 'teacher' | 'student';
}
