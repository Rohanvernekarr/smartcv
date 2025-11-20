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
    <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-8 lg:px-16 xl:px-32 py-4 bg-white border-b border-zinc-200 shadow-sm z-10">
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-center md:justify-start">
        <span className="font-semibold text-zinc-700 text-lg">Template:</span>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => onTemplateChange(t.id)}
              className={`px-4 py-2 rounded-lg font-medium border transition-colors duration-200 ${selectedTemplate === t.id ? 'bg-zinc-900 text-white border-zinc-900 shadow' : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-center md:justify-end">
        <DownloadPDFButton previewRef={previewRef} />
        {/* DOCX export button placeholder */}
        <button className="px-4 py-2 rounded-lg border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 font-medium transition-colors">Export DOCX</button>
      </div>
    </div>
  );
} 