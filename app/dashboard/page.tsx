'use client';
import React from 'react';
import { useAuth } from '../../components/AuthProvider';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, loading } = useAuth() || {};
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return null;

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="card w-full max-w-3xl mx-auto mt-12">
        <h1 className="text-4xl font-extrabold text-accent mb-2">Welcome to Your Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Create, manage, and download your resumes with ease.</p>
        <div className="flex flex-col items-center gap-4">
          <button
            className="button-primary w-full max-w-xs"
            onClick={() => router.push('/resume')}
          >
            + Create New Resume
          </button>
          <div className="h-32 flex items-center justify-center text-gray-400 italic w-full border-t pt-6 mt-6">No resumes yet. Start by creating one!</div>
        </div>
      </div>
    </div>
  );
} 