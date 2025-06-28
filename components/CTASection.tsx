import React from 'react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/50 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to land your dream job?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've already transformed their careers with SmartCV.
          </p>
          <Link 
            href="/login" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Start Building Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 