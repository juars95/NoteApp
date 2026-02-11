import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: false })
  isArchived: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Category, (category) => category.notes, { cascade: true, eager: true })
  @JoinTable() // Esta tabla la crea el ORM automáticamente
  categories: Category[];
}