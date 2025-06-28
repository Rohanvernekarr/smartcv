import React from 'react';

interface JobDescriptionFormProps {
  jobDescription: string;
  onJobDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const JobDescriptionForm = ({ jobDescription, onJobDescriptionChange }: JobDescriptionFormProps) => {
  return (
    <div className="space-y-4">
      <label className="text-lg font-semibold text-gray-800 flex items-center">
        <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.294a2 2 0 01-.78 1.563l-1.44 1.44" />
        </svg>
        Job Description
      </label>
      
      <textarea
        className="w-full h-40 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        placeholder="Paste the job description you're applying for. This helps our AI provide more targeted feedback..."
        value={jobDescription}
        onChange={onJobDescriptionChange}
        required
      />
      
      {jobDescription && (
        <div className="text-sm text-gray-600 flex items-center">
          <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {jobDescription.split(' ').length} words • Ready for analysis
        </div>
      )}
    </div>
  );
};

export default JobDescriptionForm; 