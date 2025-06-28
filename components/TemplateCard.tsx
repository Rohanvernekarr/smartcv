import React from 'react';

interface Template {
  id: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  isPremium: boolean;
}

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onPreview: (template: Template) => void;
}

export default function TemplateCard({ template, isSelected, onSelect, onPreview }: TemplateCardProps) {
  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
        isSelected ? 'ring-2 ring-blue-500 shadow-xl rounded-xl' : 'hover:shadow-lg'
      }`}
      onClick={() => onSelect(template.id)}
    >
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Template Preview Image */}
        <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <div className="w-32 h-40 bg-white shadow-md rounded-sm border border-gray-200 flex flex-col p-2">
            <div className="h-3 bg-gray-300 rounded mb-2"></div>
            <div className="h-2 bg-gray-200 rounded mb-1"></div>
            <div className="h-2 bg-gray-200 rounded mb-2"></div>
            <div className="h-2 bg-gray-100 rounded mb-1"></div>
            <div className="h-2 bg-gray-100 rounded mb-1"></div>
            <div className="flex-1"></div>
            <div className="h-1 bg-gray-100 rounded"></div>
          </div>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPreview(template);
              }}
              className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg font-medium transition-all duration-300 hover:bg-gray-50"
            >
              Preview
            </button>
          </div>
          
          {/* Premium Badge */}
          {template.isPremium && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              PRO
            </div>
          )}
          
          {/* Selected Badge */}
          {isSelected && (
            <div className="absolute top-3 left-3 bg-blue-500 text-white rounded-full p-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Template Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{template.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                template.category === 'Modern' ? 'bg-blue-100 text-blue-800' :
                template.category === 'Creative' ? 'bg-purple-100 text-purple-800' :
                template.category === 'Professional' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {template.category}
              </span>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-gray-600 ml-1">{template.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 