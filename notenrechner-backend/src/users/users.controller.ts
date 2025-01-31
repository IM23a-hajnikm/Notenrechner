import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
        return this.usersService.findOneById(Number(id)); // Ensure ID is cast to a number
    }

}
