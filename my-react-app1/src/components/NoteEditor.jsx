import React, { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';

const NoteEditor = ({ onSave, isSaving }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSave(title, content);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <form onSubmit={handleSubmit}>
        <div className="p-4 border-b border-slate-100">
          <input
            type="text"
            placeholder="Note Title"
            className="w-full text-xl font-semibold text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="p-4">
          <textarea
            placeholder="Paste your research text or study notes here..."
            className="w-full h-96 resize-none text-slate-700 placeholder-slate-400 focus:outline-none bg-transparent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={isSaving || !title.trim() || !content.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? 'Saving...' : 'Save & Analyze Note'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;
