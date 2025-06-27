
'use client';

import React, { useState, useEffect } from 'react';

interface Resume {
  id: string;
  title: string;
  lastModified: Date;
  createdAt: Date;
  template: string;
  status: 'complete' | 'draft';
}

export default function DashboardPage() {
  const [user] = useState({ email: 'john.doe@example.com' }); // Mock user
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'lastModified' | 'created' | 'title'>('lastModified');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Initialize mock data
  useEffect(() => {
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
  }, []);

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
    console.log('Create resume');
  };

  const handleEditResume = (resumeId: string) => {
    console.log('Edit resume:', resumeId);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Header - Full Width */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm sticky top-0 z-10">
        <div className="max-w-8xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Welcome back, {user.email.split('@')[0]}
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Build your career with professional resumes
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white/70 hover:bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 border border-white/50 hover:border-white/80 shadow-md hover:shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Import Resume
              </button>
              <button
                onClick={handleCreateResume}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="max-w-8xl mx-auto px-6 lg:px-8 py-8">
        {/* Modern Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Total Resumes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{resumes.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{resumes.filter(r => r.status === 'complete').length}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">In Progress</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{resumes.filter(r => r.status === 'draft').length}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Last Updated</p>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  {resumes.length > 0 ? formatDate(resumes.reduce((latest, r) => r.lastModified > latest ? r.lastModified : latest, resumes[0].lastModified)) : 'Never'}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Search and Filter Bar */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/30 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search your resumes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/70 border border-white/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="text-sm font-semibold text-gray-700 whitespace-nowrap">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'lastModified' | 'created' | 'title')}
                  className="px-4 py-3 bg-white/70 border border-white/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm min-w-[180px] font-medium"
                >
                  <option value="lastModified">Last Modified</option>
                  <option value="created">Date Created</option>
                  <option value="title">Title</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all duration-300 ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/70 text-gray-600 hover:bg-white/90'}`}
                  title="List View"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all duration-300 ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/70 text-gray-600 hover:bg-white/90'}`}
                  title="Grid View"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedResumes.map((resume) => (
                <div key={resume.id} className="group bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {resume.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          resume.status === 'complete' 
                            ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200' 
                            : 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200'
                        }`}>
                          {resume.status === 'complete' ? '✓ Complete' : '⏳ Draft'}
                        </span>
                        <span className="text-sm text-gray-600 bg-gray-100/70 px-3 py-1 rounded-full font-medium border border-gray-200">
                          {resume.template}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6 text-sm text-gray-600 bg-gradient-to-r from-gray-50/70 to-gray-100/70 p-4 rounded-xl border border-gray-200/50">
                    <div className="flex justify-between">
                      <span className="font-semibold">Created:</span>
                      <span>{formatDate(resume.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Modified:</span>
                      <span>{formatDate(resume.lastModified)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => handleEditResume(resume.id)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                    >
                      Edit Resume
                    </button>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDuplicateResume(resume.id)}
                        className="flex-1 px-4 py-3 bg-white/70 hover:bg-white/90 border border-white/50 hover:border-indigo-300 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-gray-700 hover:text-indigo-600"
                        title="Duplicate"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="hidden sm:inline">Copy</span>
                      </button>
                      <button
                        onClick={() => handleDeleteResume(resume.id)}
                        className="flex-1 px-4 py-3 bg-red-50/70 hover:bg-red-100/70 border border-red-200 hover:border-red-300 text-red-600 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
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
              ))}
            </div>
          ) : (
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-200/50">
                {filteredAndSortedResumes.map((resume) => (
                  <div key={resume.id} className="p-6 hover:bg-white/40 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            {resume.title}
                          </h3>
                          <div className="flex gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              resume.status === 'complete' 
                                ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200' 
                                : 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200'
                            }`}>
                              {resume.status === 'complete' ? '✓ Complete' : '⏳ Draft'}
                            </span>
                            <span className="text-sm text-gray-600 bg-gray-100/70 px-3 py-1 rounded-full font-medium border border-gray-200">
                              {resume.template}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-600">
                          <span className="font-medium">Created: {formatDate(resume.createdAt)}</span>
                          <span className="font-medium">Modified: {formatDate(resume.lastModified)}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditResume(resume.id)}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDuplicateResume(resume.id)}
                          className="px-4 py-3 bg-white/70 hover:bg-white/90 border border-white/50 hover:border-indigo-300 rounded-xl transition-all duration-300 flex items-center gap-2 font-semibold text-gray-700 hover:text-indigo-600"
                          title="Duplicate"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteResume(resume.id)}
                          className="px-4 py-3 bg-red-50/70 hover:bg-red-100/70 border border-red-200 hover:border-red-300 text-red-600 rounded-xl transition-all duration-300 flex items-center gap-2 font-semibold"
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
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-16 text-center border border-white/30 shadow-lg">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-16 h-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              {searchTerm ? 'No matching resumes found' : 'Ready to launch your career?'}
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
              {searchTerm 
                ? 'Try adjusting your search terms or create a new resume to get started with your professional journey'
                : 'Create your first professional resume and take the next step toward your dream job. Our modern tools make it easy to showcase your unique skills and experience.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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