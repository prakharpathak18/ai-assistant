import React from 'react';
import { Sparkles, FileText } from 'lucide-react';

const SummaryPanel = ({ summary, loading }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          AI Summary
        </h3>
      </div>
      <div className="p-5">
        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
        ) : summary ? (
          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
            {summary.content}
          </p>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="bg-slate-100 p-3 rounded-full mb-3">
              <FileText className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium">No summary generated yet.</p>
            <p className="text-slate-400 text-sm mt-1">Click 'Process AI' to generate.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryPanel;
