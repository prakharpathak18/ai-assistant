import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import { FileText, Plus, Trash2, ArrowRight } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { notes, loading, fetchNotes, deleteNote } = useNotes();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  if (loading && notes.length === 0) {
    return <div className="mt-20"><LoadingSpinner size={40} /></div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Your Research Notes</h1>
          <p className="text-slate-500 mt-1">Manage and review your AI-processed study materials.</p>
        </div>
        <Link
          to="/notes/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          New Note
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No notes yet</h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-6">
            Get started by creating your first note and let AI generate summaries, tags, and quizzes for you.
          </p>
          <Link
            to="/notes/new"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
          >
            Create first note <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-slate-800 text-lg line-clamp-1 flex-1 pr-2" title={note.title}>
                  {note.title}
                </h3>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to delete this note?')) {
                      deleteNote(note.id);
                    }
                  }}
                  className="text-slate-400 hover:text-red-500 transition-colors p-1"
                  aria-label="Delete note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
                {note.content}
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                <span className="text-xs text-slate-400">
                  {new Date(note.created_at).toLocaleDateString()}
                </span>
                <Link
                  to={`/notes/${note.id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
