import React from 'react';
import { Bot, BarChart3, Palette, Zap } from 'lucide-react';

export default function LoginHero() {
  return (
    <div className="hidden lg:block space-y-8 mt-[-30px]">
      <div className="space-y-6">
        <h1 className="text-6xl font-bold text-zinc-900 leading-tight">
          Build Your Dream Resume
        </h1>
        <p className="text-xl text-zinc-600 leading-relaxed">
          Create professional, ATS-friendly resumes with AI assistance. 
          Stand out from the crowd and land your dream job.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
          <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-white mb-4">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-zinc-900 mb-2">AI-Powered Writing</h3>
          <p className="text-sm text-zinc-600">Get intelligent suggestions for bullet points and descriptions</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
          <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-white mb-4">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-zinc-900 mb-2">Resume Analytics</h3>
          <p className="text-sm text-zinc-600">Track views, downloads, and optimize for ATS systems</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
          <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-white mb-4">
            <Palette className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-zinc-900 mb-2">Beautiful Templates</h3>
          <p className="text-sm text-zinc-600">Choose from professionally designed templates</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
          <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-white mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-zinc-900 mb-2">Quick Export</h3>
          <p className="text-sm text-zinc-600">Export to PDF, Word, or share with a custom link</p>
        </div>
      </div>

     
    </div>
  );
} 