import { useState, useCallback, useMemo } from 'react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from './useAuth';

export const useNotes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setNotes(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchNoteById = useCallback(async (noteId) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch note and its relations
      const { data: note, error: noteError } = await supabase
        .from('notes')
        .select('*')
        .eq('id', noteId)
        .single();
        
      if (noteError) throw noteError;

      const [summaryRes, tagsRes, quizzesRes] = await Promise.all([
        supabase.from('summaries').select('*').eq('note_id', noteId).single(),
        supabase.from('tags').select('*').eq('note_id', noteId),
        supabase.from('quizzes').select('*').eq('note_id', noteId)
      ]);

      return {
        ...note,
        summary: summaryRes.data,
        tags: tagsRes.data || [],
        quizzes: quizzesRes.data || []
      };
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createNote = useCallback(async (title, content) => {
    if (!user) return null;
    setLoading(true);
    setError(null);
    try {
      const { data, error: insertError } = await supabase
        .from('notes')
        .insert([{ user_id: user.id, title, content }])
        .select()
        .single();

      if (insertError) throw insertError;
      setNotes(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const deleteNote = useCallback(async (noteId) => {
    setLoading(true);
    setError(null);
    try {
      const { error: deleteError } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId);

      if (deleteError) throw deleteError;
      setNotes(prev => prev.filter(note => note.id !== noteId));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // useMemo for filtering or sorting if needed later
  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [notes]);

  return {
    notes: sortedNotes,
    loading,
    error,
    fetchNotes,
    fetchNoteById,
    createNote,
    deleteNote
  };
};
