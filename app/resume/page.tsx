'use client';
import React, { useState, useRef } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { useRouter } from 'next/navigation';
import ResumeForm from '../../components/ResumeForm';
import { saveResume } from '../../db/resume';
import ResumePreview from '../../components/ResumePreview';
import DownloadPDFButton from '../../components/DownloadPDFButton';

export default function ResumePage() {
  const { user, loading } = useAuth() || {};
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<any>(null);
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
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-blue-50 py-12">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <h1 className="text-4xl font-extrabold text-accent mb-8">Create Resume</h1>
            <ResumeForm onSave={handleSave} onChange={handleFormChange} />
            {status && <div className="mt-4 text-sm text-center text-accent">{status}</div>}
          </div>
        </div>
        <div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold text-gray-800">Live Preview</div>
              <DownloadPDFButton previewRef={previewRef} />
            </div>
            <div ref={previewRef as React.RefObject<HTMLDivElement>}>
              <ResumePreview data={previewData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 