import React from 'react';

interface StatusMessageProps {
  status: string | null;
  isAnalyzing: boolean;
}

const StatusMessage = ({ status, isAnalyzing }: StatusMessageProps) => {
  if (!status || isAnalyzing) return null;

  const isError = status.includes('failed') || status.includes('Could not');

  return (
    <div className={`text-center p-4 rounded-xl ${
      isError
        ? 'bg-red-50 text-red-700 border border-red-200' 
        : 'bg-blue-50 text-blue-700 border border-blue-200'
    }`}>
      {status}
    </div>
  );
};

export default StatusMessage; 