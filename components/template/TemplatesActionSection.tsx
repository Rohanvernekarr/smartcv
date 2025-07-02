import React from 'react';

export default function TemplatesActionSection() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h3>
      <p className="text-gray-600 mb-6">
        Select a template and start building your professional resume in minutes
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          Start with Selected Template
        </button>
        <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
          Browse More Templates
        </button>
      </div>
    </div>
  );
} 