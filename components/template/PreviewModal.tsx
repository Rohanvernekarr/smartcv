import React from 'react';

interface Template {
  id: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  isPremium: boolean;
}

interface PreviewModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PreviewModal({ template, isOpen, onClose }: PreviewModalProps) {
  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-mono text-gray-900">{template.name}</h3>
            <p className="text-gray-600 font-mono">{template.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 font-mono hover:text-gray-600 transition-colors"
            title="Close preview"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 h-96 bg-gray-50 flex items-center justify-center">
          <div className="w-64 h-80 bg-white shadow-lg rounded-lg border border-gray-200 p-4">
            <div className="h-full flex flex-col">
              <div className="h-6 bg-gray-300 rounded mb-3"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="h-2 bg-gray-100 rounded mb-2"></div>
              <div className="h-2 bg-gray-100 rounded mb-2"></div>
              <div className="h-2 bg-gray-100 rounded mb-4"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-2 bg-gray-100 rounded mb-2"></div>
              <div className="flex-1"></div>
              <div className="h-2 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 font-mono border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <div className="relative group inline-block">
          <button className="px-6 py-2 bg-zinc-500 font-mono text-white rounded-lg hover:bg-zinc-600 transition-colors">
            Use Template
          </button>
          <div className="absolute bottom-full font-mono left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-zinc-600 text-white text-sm rounded px-2 py-1 whitespace-nowrap shadow-lg z-10">
            Coming soon
          </div>
        </div>
        </div>
      </div>
    </div>
  );
} 