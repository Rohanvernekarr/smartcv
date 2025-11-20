import React from 'react';

interface AnalyzeButtonProps {
  isAnalyzing: boolean;
  isDisabled: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const AnalyzeButton = ({ isAnalyzing, isDisabled, onClick }: AnalyzeButtonProps) => {
  return (
    <div className="text-center">
      <button
        onClick={onClick}
        disabled={isDisabled}
        className="bg-black text-white px-12 py-4 rounded-xl font-bold text-lg  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        {isAnalyzing ? (
          <span className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
            Analyzing with AI...
          </span>
        ) : (
          'Analyze My Resume'
        )}
      </button>
    </div>
  );
};

export default AnalyzeButton; 