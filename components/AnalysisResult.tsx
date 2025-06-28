import React from 'react';

interface AnalysisResultProps {
  result: any;
}

export default function AnalysisResult({ result }: AnalysisResultProps) {
  if (!result) return null;

  return (
    <div className="bg-blue-100 border border-blue-300 rounded-xl p-6 mt-6">
      <h2 className="text-xl font-bold text-accent mb-2">Gemini AI Feedback</h2>
      <pre className="whitespace-pre-wrap text-gray-800 text-sm">{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
} 