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
import { getUserResumes } from '../../db/resume';
import { uploadResumeFile } from '../../lib/supabaseClient';

// Main Analyze Page Component
export default function AnalyzePage() {
  const { user, loading } = useAuth() || {};
  const router = useRouter();
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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

  // Restore analysis state from localStorage on mount
  React.useEffect(() => {
    const savedResume = localStorage.getItem('analyze_resumeText');
    const savedJobDesc = localStorage.getItem('analyze_jobDescription');
    const savedIsAnalyzing = localStorage.getItem('analyze_isAnalyzing');
    const savedResult = localStorage.getItem('analyze_result');
    const savedStatus = localStorage.getItem('analyze_status');
    const savedFileName = localStorage.getItem('analyze_fileName');
    if (savedResume) setResumeText(savedResume);
    if (savedJobDesc) setJobDescription(savedJobDesc);
    if (savedIsAnalyzing === 'true') setIsAnalyzing(true);
    if (savedResult) setResult(JSON.parse(savedResult));
    if (savedStatus) setStatus(savedStatus);
    if (savedFileName) setFileName(savedFileName);
  }, []);

  // Persist state to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('analyze_resumeText', resumeText);
  }, [resumeText]);
  React.useEffect(() => {
    localStorage.setItem('analyze_jobDescription', jobDescription);
  }, [jobDescription]);
  React.useEffect(() => {
    localStorage.setItem('analyze_isAnalyzing', isAnalyzing ? 'true' : 'false');
  }, [isAnalyzing]);
  React.useEffect(() => {
    if (result) {
      localStorage.setItem('analyze_result', JSON.stringify(result));
    } else {
      localStorage.removeItem('analyze_result');
    }
  }, [result]);
  React.useEffect(() => {
    if (status) {
      localStorage.setItem('analyze_status', status);
    } else {
      localStorage.removeItem('analyze_status');
    }
  }, [status]);
  React.useEffect(() => {
    if (fileName) {
      localStorage.setItem('analyze_fileName', fileName);
    } else {
      localStorage.removeItem('analyze_fileName');
    }
  }, [fileName]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement> | { target: { files: File[] } }) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    setUploadedFile(file);
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
      // if (user) {
      //   try {
      //     await saveResume(user.id, text, 'draft');
      //   } catch (err) {
      //     console.error('Failed to save resume draft:', err);
      //   }
      // }
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
    // Save analysis state to localStorage
    localStorage.setItem('analyze_resumeText', resumeText);
    localStorage.setItem('analyze_jobDescription', jobDescription);
    localStorage.setItem('analyze_isAnalyzing', 'true');
    
    try {
      // Upload file to Supabase Storage if available
      let fileUrl = null;
      if (uploadedFile && user) {
        try {
          const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
          fileUrl = await uploadResumeFile(user.id, uploadedFile, ext === 'pdf' ? 'pdf' : ext === 'docx' ? 'docx' : 'json');
        } catch (err) {
          console.error('Failed to upload resume file:', err);
        }
      }
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
      // Save resume as complete after analysis, with fileUrl if available
      // if (user) {
      //   try {
      //     await saveResume(user.id, resumeText, 'complete', fileUrl || undefined);
      //   } catch (err) {
      //     console.error('Failed to save analyzed resume:', err);
      //   }
      // }
      // Clear analysis state from localStorage
      localStorage.removeItem('analyze_resumeText');
      localStorage.removeItem('analyze_jobDescription');
      localStorage.removeItem('analyze_isAnalyzing');
    } catch (err) {
      setStatus('Analysis failed. Please try again.');
      console.error('Analysis error:', err);
      // Clear analysis state from localStorage on error
      localStorage.removeItem('analyze_resumeText');
      localStorage.removeItem('analyze_jobDescription');
      localStorage.removeItem('analyze_isAnalyzing');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAnalysisState = () => {
    setResumeText('');
    setJobDescription('');
    setIsAnalyzing(false);
    setResult(null);
    setStatus(null);
    setFileName('');
    localStorage.removeItem('analyze_resumeText');
    localStorage.removeItem('analyze_jobDescription');
    localStorage.removeItem('analyze_isAnalyzing');
    localStorage.removeItem('analyze_result');
    localStorage.removeItem('analyze_status');
    localStorage.removeItem('analyze_fileName');
  };

  const handleCancelAnalyze = () => {
    clearAnalysisState();
  };

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <AnalyzeHeader />

        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-8 space-y-8">
         
            <FileUploadSection
              resumeText={resumeText}
              fileName={fileName}
              onFileUpload={handleFileUpload}
              onResumeTextChange={handleResumeTextChange}
              status={status}
            />

           
            <JobDescriptionForm
              jobDescription={jobDescription}
              onJobDescriptionChange={handleJobDescriptionChange}
            />

            {/* Analyze Button and Cancel Button */}
            <div className="flex justify-center gap-4">
              <AnalyzeButton
                isAnalyzing={isAnalyzing}
                isDisabled={
                  isAnalyzing ||
                  !(typeof resumeText === 'string' && resumeText.trim()) ||
                  !(typeof jobDescription === 'string' && jobDescription.trim())
                }
                onClick={handleAnalyze}
              />
              {isAnalyzing && (
                <button
                  type="button"
                  onClick={handleCancelAnalyze}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
              )}
            </div>

            
            <StatusMessage status={status} isAnalyzing={isAnalyzing} />
          </div>

          <div className="border-t border-gray-200 p-8 min-h-[200px]">
            <AnalysisResult 
              result={result}
              isLoading={isAnalyzing}
              onAnalyzeAnother={clearAnalysisState}
              resumeText={resumeText}
              jobDescription={jobDescription}
            />
          </div>
        </div>

        
        {!result && !isAnalyzing && <FeaturesSection />}
      </div>
    </div>
  );
}