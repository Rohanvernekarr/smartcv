import React from 'react';
import Link from 'next/link';

interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="w-full text-center">
          
          <div className="inline-flex items-center px-4 py-2 bg-white backdrop-blur-sm rounded-full border border-zinc-300 shadow-sm mb-8">
            <span className="text-sm font-medium text-zinc-700">✨ AI-Powered Resume Intelligence</span>
          </div>

          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-zinc-900 mb-8 leading-tight">
            <span className="text-zinc-900">
              SmartCV
            </span>
            <br />
            <span className="text-3xl sm:text-5xl lg:text-6xl font-bold text-zinc-700">
              AI Resume Builder & Analyzer
            </span>
          </h1>

          
          <p className="text-lg sm:text-xl text-zinc-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Create stunning resumes, get AI-powered insights, and land your dream job. 
            Our intelligent platform helps you stand out in today&#39;s competitive market.
          </p>

          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              href="/login" 
              className="group relative px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 min-w-[200px]"
            >
              <span className="relative z-10">Get Started Free</span>
            </Link>
            <button className="px-8 py-4 bg-white text-zinc-700 font-semibold rounded-2xl border border-zinc-300 hover:bg-zinc-50 hover:shadow-lg transition-all duration-300 min-w-[200px]">
              Watch Demo
            </button>
          </div>

        
        
      </div>
    </section>
  );
} 