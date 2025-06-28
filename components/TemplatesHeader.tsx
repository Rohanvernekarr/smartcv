import React from 'react';

interface TemplatesHeaderProps {
  templatesCount: number;
}

export default function TemplatesHeader({ templatesCount }: TemplatesHeaderProps) {
  return (
    <>
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Resume <span className="text-blue-600">Templates</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose from our collection of professionally designed templates to create a resume that stands out
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
          <div className="text-3xl font-bold text-blue-600 mb-2">{templatesCount}+</div>
          <div className="text-gray-600">Professional Templates</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
          <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
          <div className="text-gray-600">Average Rating</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
          <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
          <div className="text-gray-600">Downloads</div>
        </div>
      </div>
    </>
  );
} 