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
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-blue-50 py-12">
      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 mb-8">
          <h1 className="text-4xl font-extrabold text-accent mb-4">Welcome to Your Dashboard</h1>
          <p className="text-gray-700 mb-8">Create, manage, and download your resumes with ease.</p>
          <div className="flex flex-col items-center gap-6">
            <button
              className="button-primary w-full max-w-xs text-lg"
              onClick={() => router.push('/resume')}
            >
              + Create New Resume
            </button>
            <div className="h-32 flex items-center justify-center text-gray-400 italic w-full border-t pt-6 mt-6">No resumes yet. Start by creating one!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
