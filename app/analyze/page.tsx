'use client';
import React, { useState } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { useRouter } from 'next/navigation';
import { analyzeResume } from '../../lib/gemini';
import AnalyzeHeader from '../../components/AnalyzeHeader';
import FileUploadSection from '../../components/FileUploadSection';
import JobDescriptionForm from '../../components/JobDescriptionForm';
import AnalyzeButton from '../../components/AnalyzeButton';
import StatusMessage from '../../components/StatusMessage';
import AnalysisResult from '../../components/AnalysisResult';
import FeaturesSection from '../../components/FeaturesSection';

// Main Analyze Page Component
export default function AnalyzePage() {
  const { user, loading } = useAuth() || {};
  const router = useRouter();
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<any>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  React.useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement> | { target: { files: File[] } }) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    setStatus('Reading file...');
    
    try {
      let text = '';
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext === 'pdf') {
        // Dynamically import pdfjs-dist only in the browser
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item: any) => item.str).join(' ') + '\n';
        }
      } else if (ext === 'docx') {
        // Dynamically import mammoth only in the browser
        const mammoth = await import('mammoth');
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else if (ext === 'txt') {
        // Plain text
        text = await file.text();
      } else {
        setStatus('Unsupported file type. Please upload PDF, DOCX, or TXT.');
        return;
      }
      setResumeText(text);
      setStatus(null);
    } catch (err) {
      setStatus('Could not extract text. Please paste your resume text.');
      console.error('File extraction error:', err);
    }
  };

  const handleResumeTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value);
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleAnalyze = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!resumeText.trim() || !jobDescription.trim()) {
      setStatus('Please provide both resume and job description.');
      return;
    }

    setIsAnalyzing(true);
    setStatus('Analyzing with AI...');
    setResult(null);
    
    try {
      const aiResult = await analyzeResume({ 
        resume: resumeText, 
        jobDescription 
      });
      setResult(aiResult);
      setStatus(null);
    } catch (err) {
      setStatus('Analysis failed. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <AnalyzeHeader />

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-8 space-y-8">
            {/* File Upload Section */}
            <FileUploadSection
              resumeText={resumeText}
              fileName={fileName}
              onFileUpload={handleFileUpload}
              onResumeTextChange={handleResumeTextChange}
              status={status}
            />

            {/* Job Description Input */}
            <JobDescriptionForm
              jobDescription={jobDescription}
              onJobDescriptionChange={handleJobDescriptionChange}
            />

            {/* Analyze Button */}
            <AnalyzeButton
              isAnalyzing={isAnalyzing}
              isDisabled={isAnalyzing || !resumeText.trim() || !jobDescription.trim()}
              onClick={handleAnalyze}
            />

            {/* Status Message */}
            <StatusMessage status={status} isAnalyzing={isAnalyzing} />
          </div>

          {/* Results Section */}
          {(result || isAnalyzing) && (
            <div className="border-t border-gray-200 p-8">
              <AnalysisResult result={result} isLoading={isAnalyzing} />
            </div>
          )}
        </div>

        {/* Features Section */}
        {!result && !isAnalyzing && <FeaturesSection />}
      </div>
    </div>
  );
}