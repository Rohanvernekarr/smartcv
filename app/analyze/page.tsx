'use client';
import React, { useState } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { useRouter } from 'next/navigation';
import { analyzeResume } from '../../lib/gemini';

export default function AnalyzePage() {
  const { user, loading } = useAuth() || {};
  const router = useRouter();
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<any>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');

  React.useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setStatus('Reading file...');
    try {
      const text = await file.text(); // MVP extraction
      setResumeText(text);
      setStatus(null);
    } catch (err) {
      setStatus('Could not read file. Please paste your resume text.');
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Analyzing with Gemini...');
    setResult(null);
    try {
      const aiResult = await analyzeResume({ resume: resumeText, jobDescription });
      setResult(aiResult);
      setStatus(null);
    } catch (err) {
      setStatus('Analysis failed. Please try again.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-50 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-gray-200">
        <h1 className="text-4xl font-bold text-accent text-center">AI Resume Analyzer</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Upload your resume and provide a job description. Our AI will compare and suggest improvements instantly using Gemini API.
        </p>

        {/* Upload Section */}
        <div className="space-y-4">
          <label className="font-semibold text-lg">Upload Resume</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md px-4 py-2"
            onChange={handleFileUpload}
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
            onChange={e => setResumeText(e.target.value)}
          />
        </div>

        {/* Job Description & Analyze */}
        <form onSubmit={handleAnalyze} className="space-y-4">
          <label className="font-semibold text-lg">Job Description</label>
          <textarea
            className="w-full h-32 p-4 border border-gray-300 rounded-md resize-y text-sm"
            placeholder="Paste the job description..."
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full max-w-xs mx-auto block bg-accent hover:bg-accent-dark text-white font-bold py-2 px-6 rounded-xl transition duration-200"
          >
            {status === 'Analyzing with Gemini...' ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </form>

        {/* Status */}
        {status && (
          <div className="text-center text-accent font-medium mt-4">{status}</div>
        )}

        {/* AI Result */}
        {result && (
          <div className="bg-blue-100 border border-blue-300 rounded-xl p-6 mt-6">
            <h2 className="text-xl font-bold text-accent mb-2">Gemini AI Feedback</h2>
            <pre className="whitespace-pre-wrap text-gray-800 text-sm">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
