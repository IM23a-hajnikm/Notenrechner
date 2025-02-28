import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Grade } from '../grades/grade.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @OneToMany(() => Grade, grade => grade.user)
    grades: Grade[];
}