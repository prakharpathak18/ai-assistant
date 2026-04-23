import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import { useGeminiAI } from '../hooks/useGeminiAI';
import NoteEditor from '../components/NoteEditor';
import { ArrowLeft } from 'lucide-react';

const CreateNote = () => {
  const navigate = useNavigate();
  const { createNote } = useNotes();
  const { processNote } = useGeminiAI();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (title, content) => {
    setIsSaving(true);
    const newNote = await createNote(title, content);
    
    if (newNote) {
      // Trigger AI processing in the background but don't await it here to keep UI responsive
      // Actually, since the user expects the AI to generate content, let's await it so the detail page loads with it.
      await processNote(newNote.id);
      navigate(`/notes/${newNote.id}`);
    } else {
      setIsSaving(false);
      alert('Failed to create note. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/" className="p-2 bg-white text-slate-500 rounded-lg shadow-sm border border-slate-200 hover:text-slate-800 hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">New Research Note</h1>
          <p className="text-slate-500 mt-1">Paste your research text below. AI will automatically generate a summary, tags, and quizzes.</p>
        </div>
      </div>

      <NoteEditor onSave={handleSave} isSaving={isSaving} />
    </div>
  );
};

export default CreateNote;
