import React from 'react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
}

const features: Feature[] = [
  {
    id: 'ai-builder',
    title: 'AI Resume Builder',
    description: 'Create professional resumes with our intelligent builder. Smart templates, real-time suggestions, and automatic formatting make it effortless.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-600'
  },
  {
    id: 'smart-analyzer',
    title: 'Smart Analyzer',
    description: 'Upload your resume and get instant AI-powered analysis. Keyword optimization, ATS compatibility, and personalized improvement suggestions.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-purple-600'
  },
  {
    id: 'templates',
    title: 'Beautiful Templates',
    description: 'Choose from our curated collection of modern, ATS-friendly templates. Export to PDF with perfect formatting every time.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
      </svg>
    ),
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-pink-600'
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful AI tools designed to help you create, analyze, and optimize your resume for maximum impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradientFrom}/5 ${feature.gradientTo}/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradientFrom} ${feature.gradientTo} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 