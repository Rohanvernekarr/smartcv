'use client';
import React from 'react';
import { useAuth } from '../../components/AuthProvider';
import { useRouter } from 'next/navigation';

export default function AnalyzePage() {
  const { user, loading } = useAuth() || {};
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return null;

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="card w-full max-w-2xl mx-auto mt-12">
        <h1 className="text-4xl font-extrabold text-accent mb-2">AI Resume Analyzer</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Upload your resume and a job description to get instant feedback and improvement suggestions.</p>
        <div className="flex flex-col items-center gap-4">
          <button className="button-primary w-full max-w-xs opacity-50 cursor-not-allowed" disabled>Upload Resume (Coming Soon)</button>
          <div className="h-32 flex items-center justify-center text-gray-400 italic w-full border-t pt-6 mt-6">Analyzer coming soon.</div>
        </div>
      </div>
    </div>
  );
} 