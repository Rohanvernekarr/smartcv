import React from 'react';

export default function LoginHero() {
  return (
    <div className="hidden lg:block space-y-8">
      <div className="space-y-6">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
          Build Your Dream Resume
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Create professional, ATS-friendly resumes with AI assistance. 
          Stand out from the crowd and land your dream job.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
            🤖
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">AI-Powered Writing</h3>
          <p className="text-sm text-gray-600">Get intelligent suggestions for bullet points and descriptions</p>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
            📊
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Resume Analytics</h3>
          <p className="text-sm text-gray-600">Track views, downloads, and optimize for ATS systems</p>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
            🎨
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Beautiful Templates</h3>
          <p className="text-sm text-gray-600">Choose from professionally designed templates</p>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
            ⚡
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Quick Export</h3>
          <p className="text-sm text-gray-600">Export to PDF, Word, or share with a custom link</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex space-x-8 pt-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800">10K+</div>
          <div className="text-sm text-gray-600">Resumes Created</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800">95%</div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800">24/7</div>
          <div className="text-sm text-gray-600">AI Support</div>
        </div>
      </div>
    </div>
  );
} 