import React from 'react';
import DownloadPDFButton from '../DownloadPDFButton';

interface ResumeTopBarProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

const TEMPLATES = [
  { id: 'modern', label: 'Modern' },
  { id: 'classic', label: 'Classic' },
  { id: 'minimal', label: 'Minimal' },
];

export default function ResumeTopBar({ selectedTemplate, onTemplateChange, previewRef }: ResumeTopBarProps) {
  return (
    <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-8 lg:px-16 xl:px-32 py-4 bg-white border-b border-gray-200 shadow-sm z-10 rounded-2xl">
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-center md:justify-start">
        <span className="font-semibold text-gray-700 text-lg">Template:</span>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => onTemplateChange(t.id)}
              className={`px-4 py-2 rounded-lg font-medium border transition-colors duration-200 ${selectedTemplate === t.id ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-white text-gray-700 border-gray-200 hover:bg-indigo-50'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-center md:justify-end">
        <DownloadPDFButton previewRef={previewRef} />
        {/* DOCX export button placeholder */}
        <button className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-indigo-50 font-medium transition-colors">Export DOCX</button>
      </div>
    </div>
  );
} 