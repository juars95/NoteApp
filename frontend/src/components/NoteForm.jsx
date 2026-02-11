import { useState, useEffect } from 'react';
import { X, Save, Send, Tag } from 'lucide-react';

export default function NoteForm({ onSave, onClose, initialData, categories }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setSelectedIds(initialData.categories?.map(c => c.id) || []);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ 
    id: initialData?.id,
    title: title, 
    content: content, 
    categoryIds: selectedIds 
  });
};

  const toggleTag = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl border-2 border-blue-50 shadow-xl mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{initialData ? 'Editar Nota' : 'Nueva Nota'}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 text-lg font-bold outline-none border-b border-gray-100 focus:border-blue-500"
          placeholder="Título..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 h-32 resize-none outline-none text-gray-600"
          placeholder="Escribe algo..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="py-2">
          <label className="text-xs font-black text-gray-400 uppercase flex items-center gap-1 mb-3">
            <Tag size={12} /> Categorías
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleTag(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${selectedIds.includes(cat.id) ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-400 font-bold">Cancelar</button>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2">
            {initialData ? <Save size={18} /> : <Send size={18} />}
            {initialData ? 'Actualizar' : 'Guardar Nota'}
          </button>
        </div>
      </form>
    </div>
  );
}