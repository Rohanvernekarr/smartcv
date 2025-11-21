import React from 'react';

export default function TemplatesActionSection() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border font-mono border-gray-100 p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h3>
      <p className="text-gray-600 mb-6">
        Select a template and start building your professional resume in minutes
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">

      <div className="relative group inline-block">
        <button className="px-8 py-3 bg-zinc-600 text-white rounded-lg hover:bg-zinc-700 transition-colors font-semibold">
          Start with Selected Template
        </button>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-zinc-600 text-white text-sm rounded px-2 py-1 whitespace-nowrap shadow-lg z-10">
            Coming soon
          </div>
        </div>
        <div className="relative group inline-block">
        <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
          Browse More Templates
        </button>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-zinc-600 text-white text-sm rounded px-2 py-1 whitespace-nowrap shadow-lg z-10">
            Coming soon
          </div>
      </div>
      
        </div>
    </div>
  );
} 