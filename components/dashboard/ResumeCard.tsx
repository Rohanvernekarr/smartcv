import React from 'react';

interface Resume {
  id: string;
  title: string;
  lastModified: Date;
  createdAt: Date;
  template: string;
  status: 'complete' | 'draft';
  file_url?: string;
  data?: {
    fullName?: string;
    title?: string;
  };
}

interface ResumeCardProps {
  resume: Resume;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  formatDate: (date: Date) => string;
}

export default function ResumeCard({ resume, onEdit, onDelete, onDuplicate, formatDate }: ResumeCardProps) {
  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          resume.status === 'complete' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {resume.status === 'complete' ? 'Complete' : 'Draft'}
        </span>
      </div>

      {/* Template Badge */}
      <div className="absolute top-4 left-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {resume.template}
        </span>
      </div>

      {/* Main Content */}
      <div className="mt-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
              {resume.data?.fullName || resume.title}
            </h3>
            <p className="text-sm text-gray-700">
              {resume.data?.title || ''}
            </p>
            <p className="text-sm text-gray-500">
              Last modified: {formatDate(resume.lastModified)}
            </p>
          </div>
        </div>

        {/* Download Button if file_url exists */}
        {resume.file_url && (
          <a
            href={resume.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 mb-4"
            download
          >
            Download File
          </a>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-6">
          <button
            onClick={() => onEdit(resume.id)}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Edit Resume
          </button>
          
          <div className="relative group/actions">
            <button 
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              title="More actions"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover/actions:opacity-100 group-hover/actions:visible transition-all duration-200 z-10">
              <div className="py-2">
                <button
                  onClick={() => onDuplicate(resume.id)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Duplicate
                </button>
                <button
                  onClick={() => onDelete(resume.id)}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 