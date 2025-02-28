import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';  // Adjusted path
import { Subject } from '../subjects/subject.entity'; // Needs creation
@Entity()
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 3, scale: 1 })
    value: number;

    @Column()
    weight: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => User, user => user.grades)
    user: User;

    @ManyToOne(() => Subject)
    subject: Subject;

    @Column()
    term_id: number; // Will become relation after Term entity exists
}
