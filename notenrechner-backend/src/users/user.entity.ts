import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Grade } from '../grades/grade.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: 'teacher' | 'student';

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @OneToMany(() => Grade, (grade) => grade.user)
    grades: Grade[]; // Add this property to establish the relationship
}
