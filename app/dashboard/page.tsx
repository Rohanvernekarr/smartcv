'use client';

import React, { useState } from 'react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatsCards from '../../components/dashboard/StatsCards';
import ResumeCard from '../../components/dashboard/ResumeCard';
import { useRouter } from 'next/navigation';
import { deleteResume } from '../../db/resume';
import { useAuth } from '../../components/AuthProvider';
import { deleteResumeFile } from '../../lib/supabaseClient';
import { useResumes } from '../../components/ResumeProvider';

export default function DashboardPage() {
  const { user } = useAuth() || {};
  const { resumes, setResumes, isLoading: isLoadingResumes, fetchResumes } = useResumes();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'lastModified' | 'created' | 'title'>('lastModified');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const router = useRouter();

  // Filter and sort resumes
  const isResume = (resume: unknown): resume is Record<string, unknown> =>
    typeof resume === 'object' && resume !== null;
  const isResumeWithData = (resume: Record<string, unknown>): resume is Record<string, unknown> & { data: Record<string, unknown> } =>
    'data' in resume && typeof resume.data === 'object' && resume.data !== null;
  const filteredAndSortedResumes = resumes
    .filter(isResume)
    .filter(isResumeWithData)
    .filter((resume) =>
      typeof resume.data.title === 'string' &&
      resume.data.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return (a.data.title as string).localeCompare(b.data.title as string);
        case 'created':
          return new Date(b.created_at as string).getTime() - new Date(a.created_at as string).getTime();
        case 'lastModified':
        default:
          return new Date(b.updated_at as string).getTime() - new Date(a.updated_at as string).getTime();
      }
    });

  const handleCreateResume = () => {
    router.push('/resume');
  };

  const handleRefreshResumes = () => {
    console.log('Manually refreshing resumes...');
    fetchResumes();
  };

  const handleEditResume = (resumeId: string) => {
    router.push(`/resume?id=${resumeId}`);
  };

  const handleDeleteResume = async (resumeId: string) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        // Find the resume to get its file_url
        const resumeToDelete = resumes.find(
          (resume): resume is Record<string, unknown> =>
            isResume(resume) && 'id' in resume && resume.id === resumeId
        );
        if (
          resumeToDelete &&
          'file_url' in resumeToDelete &&
          typeof resumeToDelete.file_url === 'string' &&
          resumeToDelete.file_url
        ) {
          try {
            await deleteResumeFile(resumeToDelete.file_url);
          } catch (fileErr) {
            console.error('Failed to delete resume file from storage:', fileErr);
          }
        }
        await deleteResume(resumeId);
        setResumes((prev: unknown[]) =>
          prev.filter(
            (resume): resume is Record<string, unknown> =>
              isResume(resume) && 'id' in resume && resume.id !== resumeId
          )
        );
      } catch (error) {
        console.error('Failed to delete resume:', error);
        alert('Failed to delete resume. Please try again.');
      }
    }
  };

  const handleDuplicateResume = async (resumeId: string) => {
    try {
      const resumeToDuplicate = resumes.find(
        (r): r is Record<string, unknown> & { data: Record<string, unknown> } =>
          isResume(r) && 'id' in r && r.id === resumeId && isResumeWithData(r)
      );
      if (resumeToDuplicate) {
        const duplicatedResume: Record<string, unknown> = {
          ...resumeToDuplicate,
          id: Date.now().toString(),
          data: {
            ...resumeToDuplicate.data,
            title: `${resumeToDuplicate.data.title as string} (Copy)`
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'draft'
        };
        setResumes((prev: unknown[]) => [duplicatedResume, ...prev]);
      }
    } catch (error) {
      console.error('Failed to duplicate resume:', error);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen w-full">
      <DashboardHeader userEmail={user?.email ?? ''} onCreateResume={handleCreateResume} onRefreshResumes={handleRefreshResumes} />

      {/* Main Content - Full Width */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <StatsCards resumes={resumes} />

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search resumes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 text-gray-800 border border-gray-500 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 border text-gray-800 border-gray-500 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              title="Sort resumes by"
            >
              <option value="lastModified">Last Modified</option>
              <option value="created">Created Date</option>
              <option value="title">Title</option>
            </select>
            <div className="flex border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
                title="Grid view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
                title="List view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Debug: Show resumes array */}
       
        {/* Resumes Grid */}
        {isLoadingResumes ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading resumes...</p>
          </div>
        ) : filteredAndSortedResumes.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No resumes found</h3>
            <p className="text-gray-600 mb-6">Create your first resume to get started</p>
            <button
              onClick={handleCreateResume}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Create New Resume
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {filteredAndSortedResumes.map((resume) => (
              <ResumeCard
                key={String(resume.id)}
                resume={{
                  id: String(resume.id),
                  title: typeof resume.data.title === 'string' ? resume.data.title : 'Untitled',
                  lastModified: new Date(resume.updated_at as string),
                  createdAt: new Date(resume.created_at as string),
                  template: typeof resume.data.template === 'string' ? resume.data.template : 'Modern',
                  status: resume.status as string,
                  file_url: typeof resume.file_url === 'string' ? resume.file_url : undefined
                }}
                onEdit={handleEditResume}
                onDelete={handleDeleteResume}
                onDuplicate={handleDuplicateResume}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}