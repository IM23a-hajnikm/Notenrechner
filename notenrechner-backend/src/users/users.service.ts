import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}

    /**
     * Creates a new user and hashes the password before saving.
     */
    async create(user: Partial<User>) {
        if (user.password) {
            // Hash the password
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);
        }
        return this.userRepository.save(user);
    }

    async findOneById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    /**
     * Used by AuthService to look up a user by username.
     */
    async findByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { username } });
    }
}