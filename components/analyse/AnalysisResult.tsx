import React, { useRef } from 'react';
import DownloadPDFButton from '../DownloadPDFButton';

interface AnalysisResultProps {
  result: any;
  isLoading: boolean;
  onAnalyzeAnother?: () => void;
}

const AnalysisResult = ({ result, isLoading, onAnalyzeAnother }: AnalysisResultProps) => {
  const pdfRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <h2 className="text-xl font-bold text-gray-800">AI is analyzing your resume...</h2>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!result) return null;

  // Parse the result if it's a string
  let analysisData;
  try {
    analysisData = typeof result === 'string' ? JSON.parse(result) : result;
  } catch (e) {
    analysisData = { rawFeedback: result };
  }

  const {
    overallScore = 0,
    strengths = [],
    weaknesses = [],
    suggestions = [],
    keywordMatch = 0,
    sections = {},
    rawFeedback
  } = analysisData;

  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Resume Analysis Complete</h2>
            <p className="text-blue-100">Comprehensive AI-powered evaluation</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{overallScore}/100</div>
            <div className="text-sm text-blue-100">Overall Score</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{strengths.length}</div>
              <div className="text-sm text-gray-600">Strengths Found</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{weaknesses.length}</div>
              <div className="text-sm text-gray-600">Areas to Improve</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{keywordMatch}%</div>
              <div className="text-sm text-gray-600">Keyword Match</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Strengths */}
        {strengths.length > 0 && (
          <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Strengths
            </h3>
            <ul className="space-y-3">
              {strengths.map((strength: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-green-800">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Areas for Improvement */}
        {weaknesses.length > 0 && (
          <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
            <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Areas for Improvement
            </h3>
            <ul className="space-y-3">
              {weaknesses.map((weakness: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <span className="text-yellow-800">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
          <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21-.899-.322-1.837-.322-2.816zm8 0c0 .979-.112 1.917-.322 2.816.508-.29 1.026-.564 1.554-.82a.75.75 0 00.419-.74 41.029 41.029 0 00-.39-3.114A29.848 29.848 0 0014 11.459z" clipRule="evenodd" />
            </svg>
            AI Recommendations
          </h3>
          <div className="space-y-4">
            {suggestions.map((suggestion: string, index: number) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-purple-200">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-purple-600">{index + 1}</span>
                  </div>
                  <p className="text-purple-800">{suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Raw Feedback Fallback */}
      {rawFeedback && !strengths.length && !weaknesses.length && (
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">AI Analysis</h3>
          <div className="prose prose-gray max-w-none">
            <pre className="whitespace-pre-wrap text-gray-700 font-sans leading-relaxed">
              {rawFeedback}
            </pre>
          </div>
        </div>
      )}

      {/* PDF Hidden Content for Download */}
      <div ref={pdfRef} style={{ display: 'none', padding: 32, fontFamily: 'sans-serif', color: '#222' }}>
        <h1 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>Resume Analysis Report</h1>
        <hr style={{ margin: '12px 0' }} />
        <h2 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>Original Resume Text</h2>
        <pre style={{ background: '#f4f4f4', padding: 12, borderRadius: 6, fontSize: 13, whiteSpace: 'pre-wrap', marginBottom: 16 }}>{result?.resume || ''}</pre>
        <h2 style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>AI Analysis</h2>
        <p><strong>Overall Score:</strong> {overallScore}/100</p>
        <p><strong>Keyword Match:</strong> {keywordMatch}%</p>
        <h3 style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12 }}>Strengths</h3>
        <ul>{strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
        <h3 style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12 }}>Areas to Improve</h3>
        <ul>{weaknesses.map((w: string, i: number) => <li key={i}>{w}</li>)}</ul>
        <h3 style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12 }}>AI Recommendations</h3>
        <ul>{suggestions.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
        {rawFeedback && <><h3 style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12 }}>AI Feedback</h3><p>{rawFeedback}</p></>}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
        <DownloadPDFButton previewRef={pdfRef} fileName="analysis-report.pdf" />
        <button 
          className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
          onClick={onAnalyzeAnother}
        >
          Analyze Another Resume
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult; 