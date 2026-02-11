import { useEffect, useState } from 'react';
import * as api from './services/api';
import NoteForm from './components/NoteForm';
import { Archive, Plus, Trash2, StickyNote, ArchiveRestore, Edit3, Tag, FilterX } from 'lucide-react';

function App() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [view, setView] = useState('active'); 
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => { fetchNotes(); }, [view]);
  useEffect(() => { fetchCategories(); }, []);

  const fetchNotes = async () => {
    try {
      const res = view === 'active' ? await api.getActiveNotes() : await api.getArchivedNotes();
      setNotes(res.data || []);
    } catch (error) { console.error("Error al obtener notas:", error); }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.getCategories();
      setCategories(res.data || []);
    } catch (error) { console.error("Error al obtener categorías:", error); }
  };

  const handleSaveNote = async (data) => {
    try {
      data.id ? await api.updateNote(data.id, data) : await api.createNote(data);
      setEditingNote(null);
      setShowForm(false);
      fetchNotes();
    } catch (error) { alert("Error al guardar"); }
  };

  // Filtrado devuelve array vacío si no hay notas
  const filteredNotes = selectedCategory 
    ? (notes || []).filter(n => n.categories?.some(c => c.id === selectedCategory.id))
    : (notes || []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
          <StickyNote className="text-yellow-500" /> Mis Notas
        </h1>
        <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-200">
          <button onClick={() => setView('active')} className={`px-4 py-2 rounded-lg text-sm ${view === 'active' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>Activas</button>
          <button onClick={() => setView('archived')} className={`px-4 py-2 rounded-lg text-sm ${view === 'archived' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>Archivadas</button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* CATEGORÍAS */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${!selectedCategory ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            Todas
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${selectedCategory?.id === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {!showForm && !editingNote && view === 'active' && (
          <button 
            onClick={() => setShowForm(true)}
            className="w-full mb-8 py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 hover:border-blue-400 hover:text-blue-500 flex items-center justify-center gap-2 bg-white transition-all"
          >
            <Plus size={20} /> Crear nueva nota
          </button>
        )}

        {/* FORMULARIO */}
        {(showForm || editingNote) && (
          <NoteForm 
            onSave={handleSaveNote} 
            onClose={() => { setShowForm(false); setEditingNote(null); }} 
            initialData={editingNote}
            categories={categories}
          />
        )}

        {/* LISTADO DE NOTAS */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotes.map((note) => (
            <div key={note.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="font-bold text-xl mb-2">{note.title}</h3>
                <p className="text-gray-600 text-sm">{note.content}</p>
                <div className="flex flex-wrap gap-1 mt-4">
                  {note.categories?.map(c => (
                    <span key={c.id} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">{c.name}</span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-50">
                {view === 'active' && <button onClick={() => setEditingNote(note)} className="p-2 text-gray-400 hover:text-blue-600"><Edit3 size={18} /></button>}
                <button onClick={() => api.toggleArchiveNote(note.id).then(fetchNotes)} className="p-2 text-gray-400 hover:text-amber-600">
                  {view === 'active' ? <Archive size={18} /> : <ArchiveRestore size={18} />}
                </button>
                <button onClick={() => api.deleteNote(note.id).then(fetchNotes)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </main>

        {/* MENSAJE DE LISTA VACÍA */}
        {filteredNotes.length === 0 && !showForm && !editingNote && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium tracking-tight">No se encontraron notas en esta sección.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;