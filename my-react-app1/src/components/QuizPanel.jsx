import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const QuizPanel = ({ quizzes, loading }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-purple-600" />
          Study Quizzes
        </h3>
      </div>
      <div className="p-5">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2].map(i => (
              <div key={i} className="border border-slate-100 rounded-lg p-4">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-8 bg-slate-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : quizzes && quizzes.length > 0 ? (
          <div className="space-y-4">
            {quizzes.map((quiz, index) => (
              <div key={quiz.id} className="border border-slate-200 rounded-lg overflow-hidden transition-all hover:border-purple-300 hover:shadow-sm">
                <button
                  onClick={() => toggleAnswer(index)}
                  className="w-full px-4 py-3 text-left flex items-start justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <span className="font-medium text-slate-800 pr-4">{index + 1}. {quiz.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-4 py-3 bg-white border-t border-slate-100">
                    <p className="text-slate-700">{quiz.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-slate-500 font-medium">No quizzes generated yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPanel;
