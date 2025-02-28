import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}