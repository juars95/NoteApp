import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('categories')
  findAllCategories() {
    return this.notesService.findAllCategories();
  }

  @Get()
  getActive() {
    return this.notesService.findAllActive();
  }

  @Get('archived')
  getArchived() {
    return this.notesService.findAllArchived();
  }

  @Post()
  create(@Body() noteData: any) {
    return this.notesService.create(noteData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() noteData: any) {
    return this.notesService.update(+id, noteData);
  }

  @Patch(':id/archive')
  toggleArchive(@Param('id') id: string) {
    return this.notesService.toggleArchive(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}