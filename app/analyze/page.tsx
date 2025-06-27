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

  // Simple text extraction for PDF/DOCX (MVP: just read as text)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setStatus('Reading file...');
    try {
      const text = await file.text();
      setResumeText(text);
      setStatus(null);
    } catch (err) {
      setStatus('Could not read file. Please paste your resume text.');
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Analyzing...');
    setResult(null);
    try {
      const aiResult = await analyzeResume({ resume: resumeText, jobDescription });
      setResult(aiResult);
      setStatus(null);
    } catch (err: any) {
      setStatus('Analysis failed. Please try again.');
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-blue-50 py-12">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 mb-8">
          <h1 className="text-4xl font-extrabold text-accent mb-4">AI Resume Analyzer</h1>
          <p className="text-gray-700 mb-8">Upload your resume or paste the text, add a job description, and get instant AI feedback.</p>
          <form className="space-y-6" onSubmit={handleAnalyze}>
            <div>
              <label className="block font-semibold mb-1">Resume (PDF/DOCX or paste text)</label>
              <input type="file" accept=".pdf,.doc,.docx,.txt" className="block mb-2" onChange={handleFileUpload} title="Upload your resume file" />
              {fileName && <div className="text-xs text-gray-400 mb-2">{fileName}</div>}
              <textarea
                className="input h-32 resize-vertical"
                placeholder="Paste your resume text here..."
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Job Description</label>
              <textarea
                className="input h-24 resize-vertical"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button-primary w-full max-w-xs mx-auto">Analyze</button>
          </form>
          {status && <div className="mt-4 text-center text-accent font-medium">{status}</div>}
          {result && (
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h2 className="text-xl font-bold text-accent mb-2">AI Feedback</h2>
              <pre className="whitespace-pre-wrap text-gray-800 text-sm">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 