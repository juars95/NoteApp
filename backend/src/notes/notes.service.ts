import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Note } from './entities/note.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class NotesService implements OnModuleInit {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    const categories = ['Trabajo', 'Personal', 'Ideas', 'Importante'];
    for (const name of categories) {
      const exists = await this.categoryRepository.findOneBy({ name });
      if (!exists) await this.categoryRepository.save({ name });
    }
  }

  findAllCategories() {
    return this.categoryRepository.find();
  }

  findAllActive() {
    return this.noteRepository.find({ where: { isArchived: false }, order: { createdAt: 'DESC' } });
  }

  findAllArchived() {
    return this.noteRepository.find({ where: { isArchived: true }, order: { createdAt: 'DESC' } });
  }

  async create(noteData: any): Promise<Note> {
    const { categoryIds, ...data } = noteData;
    const note = this.noteRepository.create(data as Note);
    
    if (categoryIds && categoryIds.length > 0) {
      note.categories = await this.categoryRepository.findBy({ id: In(categoryIds) });
    }
    
    return this.noteRepository.save(note);
  }

  async update(id: number, noteData: any): Promise<Note> {
    const { title, content, categoryIds } = noteData;
    const note = await this.noteRepository.findOneBy({ id });
    if (!note) throw new NotFoundException('La nota no existe');
    note.title = title ?? note.title;
    note.content = content ?? note.content;

    if (categoryIds) {
      note.categories = await this.categoryRepository.findBy({ 
        id: In(categoryIds) 
    });
  }

  // 5. Guardamos la nota completa (esto actualiza tanto el texto como los tags)
  return this.noteRepository.save(note);
}

  async toggleArchive(id: number): Promise<Note> {
    const note = await this.noteRepository.findOneBy({ id });
    
    if (!note) throw new NotFoundException('Nota no encontrada');
    
    note.isArchived = !note.isArchived;
    return this.noteRepository.save(note);
  }

  async remove(id: number): Promise<void> {
    const result = await this.noteRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Nota no encontrada');
  }
}