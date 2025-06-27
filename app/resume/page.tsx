'use client';
import React, { useState, useRef } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { useRouter } from 'next/navigation';
import ResumeForm from '../../components/ResumeForm';
import { saveResume } from '../../db/resume';
import ResumePreview from '../../components/ResumePreview';
import DownloadPDFButton from '../../components/DownloadPDFButton';

const TEMPLATES = [
  { id: 'modern', label: 'Modern' },
  { id: 'classic', label: 'Classic' },
  { id: 'minimal', label: 'Minimal' },
];

export default function ResumePage() {
  const { user, loading } = useAuth() || {};
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const previewRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return null;

  const handleSave = async (data: any) => {
    setStatus(null);
    try {
      await saveResume(user.id, data);
      setStatus('Resume saved!');
    } catch (e: any) {
      setStatus('Error saving resume: ' + e.message);
    }
  };

  const handleFormChange = (data: any) => {
    setPreviewData(data);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br items-center ">
      {/* Top Bar: Template & Export */}
      <div className="w-7xl flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4 bg-white border-b border-gray-200 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700 text-lg">Template:</span>
          <div className="flex gap-2">
            {TEMPLATES.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className={`px-4 py-2 rounded-lg font-medium border transition-colors duration-200 ${selectedTemplate === t.id ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-white text-gray-700 border-gray-200 hover:bg-indigo-50'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <DownloadPDFButton previewRef={previewRef} />
          {/* DOCX export button placeholder */}
          <button className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-indigo-50 font-medium transition-colors">Export DOCX</button>
        </div>
      </div>

      {/* Main Content: Form & Preview */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1800px] mx-auto gap-0">
        {/* Left: Resume Form */}
        <div className="w-full lg:w-1/2 h-full overflow-y-auto p-4 bg-white border-r border-gray-100 flex flex-col">
          <div className="rounded-2xl shadow-lg border border-gray-100 p-6 h-fit bg-gradient-to-br from-white to-blue-50">
            <h1 className="text-3xl font-extrabold text-indigo-700 mb-8">Create Resume</h1>
            <ResumeForm onSave={handleSave} onChange={handleFormChange} />
            {status && <div className="mt-4 text-sm text-center text-indigo-600 font-semibold">{status}</div>}
          </div>
        </div>

        {/* Right: Live Preview (A4) */}
        <div className="w-full lg:w-1/2 h-full overflow-y-auto p-4 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="flex flex-col items-center w-full">
            <div className="mb-4 text-lg font-semibold text-gray-800">Live A4 Preview</div>
            <div
              ref={previewRef as React.RefObject<HTMLDivElement>}
              className="bg-white shadow-2xl rounded-md border border-gray-300 print:shadow-none print:border-none"
              style={{ width: 794, height: 1123, boxSizing: 'border-box', margin: '0 auto', padding: 40 }}
            >
              <ResumePreview data={previewData} template={selectedTemplate} />
            </div>
            <div className="mt-2 text-xs text-gray-400">A4 size: 210mm × 297mm (794×1123px @ 96dpi)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
