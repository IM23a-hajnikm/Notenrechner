import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('grades')
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subject: string;

    @Column('decimal', { precision: 3, scale: 1 })
    grade: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => User, user => user.grades)
    user: User;

    @Column()
    userId: number;
}
