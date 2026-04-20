import { useState, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from './useAuth';

export const useGeminiAI = () => {
  const { session } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const processNote = useCallback(async (noteId) => {
    if (!session) return false;
    setProcessing(true);
    setError(null);
    
    try {
      const { data, error: funcError } = await supabase.functions.invoke('process-note', {
        body: { noteId }
      });

      if (funcError) throw funcError;
      
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setProcessing(false);
    }
  }, [session]);

  return {
    processNote,
    processing,
    error
  };
};
