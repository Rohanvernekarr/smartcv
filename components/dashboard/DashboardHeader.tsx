import React, { useRef } from 'react';

interface DashboardHeaderProps {
  userEmail: string;
  onCreateResume: () => void;
  onRefreshResumes: () => void;
}  

export default function DashboardHeader({ userEmail, onCreateResume, onRefreshResumes }: DashboardHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white shadow-sm  w-full">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-4 mb-2 flex-wrap">
              <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="text-3xl font-bold text-zinc-900 break-words">
                  Welcome, {userEmail ? userEmail.split('@')[0] : 'User'}
                </h1>
                <p className="text-zinc-600 text-base mt-1">
                  Build your career with professional resumes
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative group inline-block w-full sm:w-auto">
              <button 
                className="w-full sm:w-auto bg-white hover:bg-zinc-50 text-zinc-700 px-5 py-2.5 rounded-lg font-medium transition-all border border-zinc-300 hover:border-zinc-400 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Import Resume
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-zinc-800 text-white text-sm rounded px-2 py-1 whitespace-nowrap shadow-lg z-10">
                Coming soon
              </div>
            </div>
            <button
              onClick={onRefreshResumes}
              className="w-full sm:w-auto bg-white hover:bg-zinc-50 text-zinc-700 px-4 py-2.5 rounded-lg font-medium transition-all border border-zinc-300 hover:border-zinc-400 flex items-center justify-center gap-2"
              title="Refresh resumes"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.doc,.docx"
              title="Import resume file"
              onChange={(e) => {
                console.log('File selected:', e.target.files?.[0]);
              }}
            />
            <button
              onClick={onCreateResume}
              className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 