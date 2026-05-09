import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import { useGeminiAI } from '../hooks/useGeminiAI';
import { ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import SummaryPanel from '../components/SummaryPanel';
import TagPanel from '../components/TagPanel';
import QuizPanel from '../components/QuizPanel';

const NoteDetail = () => {
  const { id } = useParams();
  const { fetchNoteById } = useNotes();
  const { processNote, processing, error: aiError } = useGeminiAI();
  const [noteData, setNoteData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchNoteById(id);
    setNoteData(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleProcessAI = async () => {
    const success = await processNote(id);
    if (success) {
      // Reload note data to show newly generated content
      loadData();
    }
  };

  if (loading) {
    return <div className="mt-20"><LoadingSpinner size={40} /></div>;
  }

  if (!noteData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-slate-800">Note not found</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">Return to Dashboard</Link>
      </div>
    );
  }

  const hasAIContent = noteData.summary || (noteData.tags && noteData.tags.length > 0) || (noteData.quizzes && noteData.quizzes.length > 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <Link to="/" className="p-2 bg-white text-slate-500 rounded-lg shadow-sm border border-slate-200 hover:text-slate-800 hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-800 truncate">{noteData.title}</h1>
      </div>

      {aiError && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
          <div>
            <h4 className="text-red-800 font-medium text-sm">Failed to process AI</h4>
            <p className="text-red-600 text-sm mt-1">{aiError}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Original Content</h3>
              {!hasAIContent && (
                <button
                  onClick={handleProcessAI}
                  disabled={processing}
                  className="text-sm px-3 py-1.5 bg-blue-50 text-blue-700 font-medium rounded-md hover:bg-blue-100 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${processing ? 'animate-spin' : ''}`} />
                  {processing ? 'Processing...' : 'Generate AI Content'}
                </button>
              )}
            </div>
            <div className="p-5">
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{noteData.content}</p>
            </div>
          </div>

          <SummaryPanel summary={noteData.summary} loading={processing} />
        </div>

        <div className="space-y-6">
          <TagPanel tags={noteData.tags} loading={processing} />
          <QuizPanel quizzes={noteData.quizzes} loading={processing} />
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
