import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/entities/note.entity';
import { Category } from './notes/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // acordarse de cambiar a la BD despues
      port: 5432,
      username: 'ensolvers_user',
      password: 'ensolvers_password',
      database: 'notes_db',
      entities: [Note, Category],
      synchronize: true,
    }),
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
