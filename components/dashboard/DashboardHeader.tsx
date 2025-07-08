import React, { useRef } from 'react';

interface DashboardHeaderProps {
  userEmail: string;
  onCreateResume: () => void;
  onRefreshResumes: () => void;
}  

export default function DashboardHeader({ userEmail, onCreateResume, onRefreshResumes }: DashboardHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white shadow-sm border-b w-full rounded-2xl">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-4 mb-2 flex-wrap">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent break-words max-w-xs sm:max-w-md">
                  Welcome, {userEmail ? userEmail.split('@')[0] : 'User'}
                </h1>
                <p className="text-gray-600 text-base sm:text-lg break-words max-w-xs sm:max-w-md">
                  Build your career with professional resumes
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative group inline-block w-full sm:w-auto">
              <button 
                className="w-full sm:w-auto bg-white/70 hover:bg-white/90 backdrop-blur-sm text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 border border-white/50 hover:border-white/80 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Import Resume
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-zinc-600 text-white text-sm rounded px-2 py-1 whitespace-nowrap shadow-lg z-10">
                Coming soon
              </div>
            </div>
            <button
              onClick={onRefreshResumes}
              className="w-full sm:w-auto bg-white/70 hover:bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 sm:px-4 sm:py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 border border-white/50 hover:border-white/80 shadow-md hover:shadow-lg"
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
                // Handle file upload logic here
                console.log('File selected:', e.target.files?.[0]);
              }}
            />
            <button
              onClick={onCreateResume}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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