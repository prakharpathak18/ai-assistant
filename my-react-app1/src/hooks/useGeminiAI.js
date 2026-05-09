// import { useState, useCallback } from 'react';
// import { supabase } from '../services/supabaseClient';
// import { useAuth } from './useAuth';

// export const useGeminiAI = () => {
//   const { session } = useAuth();
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState(null);

//   const processNote = useCallback(async (noteId) => {
//     if (!session) return false;
//     setProcessing(true);
//     setError(null);

//     try {
//       const { data, error: funcError } = await supabase.functions.invoke('process-note', {
//         body: { noteId }
//       });

//       if (funcError) throw funcError;

//       return data;
//     } catch (err) {
//       setError(err.message);
//       return null;
//     } finally {
//       setProcessing(false);
//     }
//   }, [session]);

//   return {
//     processNote,
//     processing,
//     error
//   };
// };









// import { useState, useCallback } from 'react';
// import { supabase } from '../services/supabaseClient';
// import { useAuth } from './useAuth';

// export const useGeminiAI = () => {
//   const { session } = useAuth();
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState(null);

//   const processNote = useCallback(async (content) => {
//     if (!session) return false;

//     setProcessing(true);
//     setError(null);

//     try {
//       const { data, error: funcError } =
//         await supabase.functions.invoke(
//           "process-note",
//           {
//             body: { content }
//           }
//         );

//       if (funcError) throw funcError;

//       return data.summary;

//     } catch (err) {
//       setError(err.message);
//       return null;

//     } finally {
//       setProcessing(false);
//     }

//   }, [session]);

//   return {
//     processNote,
//     processing,
//     error
//   };
// };


import { useState, useCallback } from "react";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "./useAuth";

export const useGeminiAI = () => {
  const { session } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const processNote = useCallback(async (content) => {
    console.log("Sending content:", content);
    if (!session) {
      console.log("No session found");
      return null;
    }

    setProcessing(true);
    setError(null);

    try {
      const { data, error: funcError } =
        await supabase.functions.invoke("process-note", {
          body: { content }
        });

      if (funcError) {
        console.error("Function error:", funcError);
        throw funcError;
      }

      console.log("Gemini response:", data);

      return data.summary;

    } catch (err) {
      console.error("Gemini failed:", err);
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