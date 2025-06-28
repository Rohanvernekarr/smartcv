import React from 'react';

interface FileUploadSectionProps {
  resumeText: string;
  fileName: string;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResumeTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function FileUploadSection({ 
  resumeText, 
  fileName, 
  onFileUpload, 
  onResumeTextChange 
}: FileUploadSectionProps) {
  return (
    <div className="space-y-4">
      <label className="font-semibold text-lg">Upload Resume</label>
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md px-4 py-2"
        onChange={onFileUpload}
        title="Upload resume file"
      />
      {fileName && (
        <div className="text-sm text-gray-500">
          <span className="font-semibold">File:</span> {fileName}
        </div>
      )}
      <textarea
        className="w-full h-40 p-4 border border-gray-300 rounded-md resize-y text-sm"
        placeholder="Or paste your resume text..."
        value={resumeText}
        onChange={onResumeTextChange}
      />
    </div>
  );
} 