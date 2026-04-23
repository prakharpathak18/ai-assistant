import React from 'react';
import { Tag, Hash } from 'lucide-react';

const TagPanel = ({ tags, loading }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-teal-50">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <Tag className="w-5 h-5 text-emerald-600" />
          Key Topics
        </h3>
      </div>
      <div className="p-5">
        {loading ? (
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-8 w-20 bg-slate-200 rounded-full animate-pulse"></div>
            ))}
          </div>
        ) : tags && tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span 
                key={tag.id}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800"
              >
                <Hash className="w-3.5 h-3.5 text-emerald-600" />
                {tag.name}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-slate-500 font-medium">No tags generated yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagPanel;
