"use client"
import React from 'react';
import { useAuth } from '../../components/AuthProvider';
import { useRouter } from 'next/navigation';

export default function TemplatesPage() {
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
        <h1 className="text-4xl font-extrabold text-accent mb-2">Resume Templates</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Switch and preview beautiful resume templates (coming soon).</p>
        <div className="h-32 flex items-center justify-center text-gray-400 italic w-full border-t pt-6 mt-6">Template switching coming soon.</div>
      </div>
    </div>
  );
} 