'use client';
import React, { useState } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { useRouter } from 'next/navigation';
import { analyzeResume } from '../../lib/gemini';
import AnalyzeHeader from '../../components/analyse/AnalyzeHeader';
import FileUploadSection from '../../components/analyse/FileUploadSection';
import JobDescriptionForm from '../../components/analyse/JobDescriptionForm';
import AnalyzeButton from '../../components/analyse/AnalyzeButton';
import StatusMessage from '../../components/analyse/StatusMessage';
import AnalysisResult from '../../components/analyse/AnalysisResult';
import FeaturesSection from '../../components/analyse/FeaturesSection';
import { getUserResumes, saveResume } from '../../db/resume';

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
    // Fetch latest resume for user
    if (!loading && user) {
      (async () => {
        try {
          console.log('Fetching resumes for user:', user);
          const resumes = await getUserResumes(user.id);
          if (resumes && resumes.length > 0) {
            // Assume the latest resume is first (ordered by updated_at desc)
            setResumeText(resumes[0].data || '');
            setFileName(resumes[0].file_url ? resumes[0].file_url.split('/').pop() : '');
          }
        } catch (err) {
          console.error('Failed to fetch user resumes:', err, 'user:', user);
        }
      })();
    }
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
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item: any) => item.str).join(' ') + '\n';
        }
      } else if (ext === 'docx') {
        const mammoth = await import('mammoth');
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else if (ext === 'txt') {
        text = await file.text();
      } else {
        setStatus('Unsupported file type. Please upload PDF, DOCX, or TXT.');
        return;
      }
      setResumeText(text);
      setStatus(null);
      // Save resume as draft after upload
      if (user) {
        try {
          await saveResume(user.id, text, 'draft');
        } catch (err) {
          console.error('Failed to save resume draft:', err);
        }
      }
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
      let parsedResult;
      try {
        parsedResult = typeof aiResult === 'string'
          ? JSON.parse(aiResult.replace(/```json|```/g, '').trim())
          : aiResult;
      } catch (parseErr) {
        setStatus('Failed to parse AI analysis. Please try again.');
        console.error('Parsing error:', parseErr, aiResult);
        setResult(null);
        setIsAnalyzing(false);
        return;
      }
      setResult(parsedResult);
      setStatus(null);
      // Save resume as complete after analysis
      if (user) {
        try {
          await saveResume(user.id, resumeText, 'complete');
        } catch (err) {
          console.error('Failed to save analyzed resume:', err);
        }
      }
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