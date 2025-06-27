'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { useRouter } from 'next/navigation';

interface Resume {
  id: string;
  title: string;
  lastModified: Date;
  createdAt: Date;
  template: string;
  status: 'complete' | 'draft';
}

export default function DashboardPage() {
  const { user, loading } = useAuth() || {};
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'lastModified' | 'created' | 'title'>('lastModified');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Authentication redirect
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  // Initialize mock data immediately
  useEffect(() => {
    if (!user) return;
    
    // Mock data - replace with actual API call
    const mockResumes: Resume[] = [
      {
        id: '1',
        title: 'Software Engineer Resume',
        lastModified: new Date('2024-06-25'),
        createdAt: new Date('2024-06-20'),
        template: 'Modern',
        status: 'complete'
      },
      {
        id: '2',
        title: 'Frontend Developer CV',
        lastModified: new Date('2024-06-24'),
        createdAt: new Date('2024-06-22'),
        template: 'Classic',
        status: 'draft'
      },
      {
        id: '3',
        title: 'Full Stack Developer Resume',
        lastModified: new Date('2024-06-23'),
        createdAt: new Date('2024-06-21'),
        template: 'Professional',
        status: 'complete'
      }
    ];
    
    setResumes(mockResumes);
  }, [user]);

  // Filter and sort resumes
  const filteredAndSortedResumes = resumes
    .filter(resume => 
      resume.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'created':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'lastModified':
        default:
          return b.lastModified.getTime() - a.lastModified.getTime();
      }
    });

  const handleCreateResume = () => {
    router.push('/resume/create');
  };

  const handleEditResume = (resumeId: string) => {
    router.push(`/resume/edit/${resumeId}`);
  };

  const handleDeleteResume = async (resumeId: string) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        setResumes(prev => prev.filter(resume => resume.id !== resumeId));
      } catch (error) {
        console.error('Failed to delete resume:', error);
      }
    }
  };

  const handleDuplicateResume = async (resumeId: string) => {
    try {
      const resumeToDuplicate = resumes.find(r => r.id === resumeId);
      if (resumeToDuplicate) {
        const duplicatedResume: Resume = {
          ...resumeToDuplicate,
          id: Date.now().toString(),
          title: `${resumeToDuplicate.title} (Copy)`,
          createdAt: new Date(),
          lastModified: new Date(),
          status: 'draft'
        };
        setResumes(prev => [duplicatedResume, ...prev]);
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

  // Show loading only for authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-center font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                Welcome, {user.email}
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Manage your professional resumes and build your career
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Import Resume
              </button>
              <button
                onClick={handleCreateResume}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
            <div className="flex items-center">
              <div className="p-2 lg:p-3 rounded-full bg-indigo-100 flex-shrink-0">
                <svg className="w-4 h-4 lg:w-6 lg:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-3 lg:ml-4 min-w-0">
                <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total Resumes</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">{resumes.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
            <div className="flex items-center">
              <div className="p-2 lg:p-3 rounded-full bg-green-100 flex-shrink-0">
                <svg className="w-4 h-4 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3 lg:ml-4 min-w-0">
                <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Completed</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">{resumes.filter(r => r.status === 'complete').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
            <div className="flex items-center">
              <div className="p-2 lg:p-3 rounded-full bg-yellow-100 flex-shrink-0">
                <svg className="w-4 h-4 lg:w-6 lg:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div className="ml-3 lg:ml-4 min-w-0">
                <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">In Progress</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900">{resumes.filter(r => r.status === 'draft').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 col-span-2 lg:col-span-1">
            <div className="flex items-center">
              <div className="p-2 lg:p-3 rounded-full bg-purple-100 flex-shrink-0">
                <svg className="w-4 h-4 lg:w-6 lg:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3 lg:ml-4 min-w-0">
                <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Last Updated</p>
                <p className="text-sm lg:text-base font-bold text-gray-900">
                  {resumes.length > 0 ? formatDate(resumes.reduce((latest, r) => r.lastModified > latest ? r.lastModified : latest, resumes[0].lastModified)) : 'Never'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="relative flex-1">
              <svg className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search resumes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <div className="flex items-center gap-2 lg:gap-3">
                <label htmlFor="sort" className="text-sm lg:text-base font-medium text-gray-700 whitespace-nowrap">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'lastModified' | 'created' | 'title')}
                  className="px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base min-w-[140px] lg:min-w-[180px]"
                >
                  <option value="lastModified">Last Modified</option>
                  <option value="created">Date Created</option>
                  <option value="title">Title</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 lg:p-3 border rounded-lg transition-colors ${viewMode === 'list' ? 'bg-indigo-50 border-indigo-300' : 'border-gray-300 hover:bg-gray-50'}`}
                  title="List View"
                >
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 lg:p-3 border rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-indigo-50 border-indigo-300' : 'border-gray-300 hover:bg-gray-50'}`}
                  title="Grid View"
                >
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Content */}
        {filteredAndSortedResumes.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
              {filteredAndSortedResumes.map((resume) => (
                <div key={resume.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-indigo-200">
                  <div className="p-4 lg:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-indigo-600 transition-colors truncate">
                          {resume.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3 lg:mb-4">
                          <span className={`px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-semibold ${
                            resume.status === 'complete' 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          }`}>
                            {resume.status === 'complete' ? 'Complete' : 'Draft'}
                          </span>
                          <span className="text-xs lg:text-sm text-gray-600 bg-gray-100 px-2 lg:px-3 py-1 rounded-full font-medium">
                            {resume.template}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4 lg:mb-6 text-xs lg:text-sm text-gray-600 bg-gray-50 p-3 lg:p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium">Created:</span>
                        <span>{formatDate(resume.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Modified:</span>
                        <span>{formatDate(resume.lastModified)}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => handleEditResume(resume.id)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 lg:py-3 px-4 lg:px-6 rounded-lg font-semibold transition-colors duration-200 text-sm lg:text-base"
                      >
                        Edit Resume
                      </button>
                      <div className="flex gap-2 lg:gap-3">
                        <button
                          onClick={() => handleDuplicateResume(resume.id)}
                          className="flex-1 px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-300 hover:border-indigo-300 hover:bg-indigo-50 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 lg:gap-2 font-medium text-xs lg:text-sm"
                          title="Duplicate"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span className="hidden sm:inline">Duplicate</span>
                        </button>
                        <button
                          onClick={() => handleDeleteResume(resume.id)}
                          className="flex-1 px-3 lg:px-4 py-2 lg:py-3 border-2 border-red-300 hover:border-red-400 hover:bg-red-50 text-red-600 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 lg:gap-2 font-medium text-xs lg:text-sm"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {filteredAndSortedResumes.map((resume) => (
                  <div key={resume.id} className="p-4 lg:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                          <h3 className="text-lg lg:text-xl font-bold text-gray-900 truncate">
                            {resume.title}
                          </h3>
                          <div className="flex gap-2">
                            <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-semibold ${
                              resume.status === 'complete' 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            }`}>
                              {resume.status === 'complete' ? 'Complete' : 'Draft'}
                            </span>
                            <span className="text-xs text-gray-600 bg-gray-100 px-2 lg:px-3 py-1 rounded-full font-medium">
                              {resume.template}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-600">
                          <span>Created: {formatDate(resume.createdAt)}</span>
                          <span>Modified: {formatDate(resume.lastModified)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 lg:gap-3">
                        <button
                          onClick={() => handleEditResume(resume.id)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold transition-colors duration-200 text-sm lg:text-base"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDuplicateResume(resume.id)}
                          className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-300 hover:border-indigo-300 hover:bg-indigo-50 rounded-lg transition-all duration-200 flex items-center gap-1 lg:gap-2 font-medium text-sm"
                          title="Duplicate"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteResume(resume.id)}
                          className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-red-300 hover:border-red-400 hover:bg-red-50 text-red-600 rounded-lg transition-all duration-200 flex items-center gap-1 lg:gap-2 font-medium text-sm"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 lg:p-16 text-center">
            <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-6 lg:mb-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 lg:w-16 lg:h-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl lg:text-3xl font-bold text-gray-900 mb-3 lg:mb-4">
              {searchTerm ? 'No resumes match your search' : 'Ready to build your career?'}
            </h3>
            <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-lg max-w-2xl mx-auto leading-relaxed">
              {searchTerm 
                ? 'Try adjusting your search terms or create a new resume to get started with your professional journey'
                : 'Create your first professional resume and take the next step in your career. Our tools make it easy to showcase your skills and experience.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
              <button
                onClick={handleCreateResume}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 lg:px-10 py-3 lg:py-4 rounded-lg font-bold transition-colors duration-200 inline-flex items-center justify-center gap-2 lg:gap-3 text-sm lg:text-lg shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {searchTerm ? 'Create New Resume' : 'Create Your First Resume'}
              </button>
              {!searchTerm && (
                <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 lg:px-10 py-3 lg:py-4 rounded-lg font-bold transition-colors duration-200 inline-flex items-center justify-center gap-2 lg:gap-3 text-sm lg:text-lg border-2 border-gray-300 hover:border-gray-400">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  Import Existing Resume
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}