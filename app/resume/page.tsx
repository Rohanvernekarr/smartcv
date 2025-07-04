'use client';
import React, { useState, useRef } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import ResumeForm from '../../components/resume/ResumeForm';
import { saveResume, getResumeById } from '../../db/resume';
import ResumeTopBar from '../../components/resume/ResumeTopBar';
import ResumePreviewContainer from '../../components/resume/ResumePreviewContainer';
import { uploadResumeFile } from '../../lib/supabaseClient';

export default function ResumePage() {
  const { user, loading } = useAuth() || {};
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const previewRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!loading && !user) router.replace('/login');
    const resumeId = searchParams?.get('id');
    if (!loading && user && resumeId) {
      (async () => {
        try {
          const resume = await getResumeById(resumeId);
          if (resume && resume.data) {
            setPreviewData(resume.data);
          }
        } catch (err) {
          setStatus('Failed to load resume for editing.');
        }
      })();
    }
  }, [user, loading, router, searchParams]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return null;

  const handleSave = async (data: any, file?: File | null) => {
    setStatus(null);
    try {
      let fileUrl;
      if (file && user) {
        const ext = file.name.split('.').pop()?.toLowerCase();
        fileUrl = await uploadResumeFile(user.id, file, ext === 'pdf' ? 'pdf' : ext === 'docx' ? 'docx' : 'json');
      }
      console.log('Saving resume:', { userId: user.id, data, status: 'complete', fileUrl });
      await saveResume(user.id, data, 'complete', fileUrl || undefined);
      setStatus('Resume saved!');
    } catch (e: any) {
      console.error('Error saving resume:', e, e?.message, e?.details, e?.hint);
      setStatus('Error saving resume: ' + (e?.message || e?.details || e?.hint || JSON.stringify(e)));
    }
  };

  const handleFormChange = (data: any) => {
    setPreviewData(data);
  };

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br items-center">
      <ResumeTopBar 
        selectedTemplate={selectedTemplate}
        onTemplateChange={handleTemplateChange}
        previewRef={previewRef}
      />

      
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1800px] mx-auto gap-0 mt-6">
        {/* Left: Resume Form */}
        <div className="w-full lg:w-1/2 h-full overflow-y-auto p-4 bg-blue-50 border-r border-gray-100 flex flex-col">
          <div className="rounded-2xl shadow-lg border border-gray-100 p-6 h-fit bg-white">
            <h1 className="text-3xl font-extrabold text-indigo-700 mb-8">Create Resume</h1>
            <ResumeForm onSave={handleSave} onChange={handleFormChange} />
            {status && <div className="mt-4 text-sm text-center text-indigo-600 font-semibold">{status}</div>}
          </div>
        </div>

        
        <ResumePreviewContainer 
          previewData={previewData}
          selectedTemplate={selectedTemplate}
          previewRef={previewRef}
        />
      </div>
    </div>
  );
}
