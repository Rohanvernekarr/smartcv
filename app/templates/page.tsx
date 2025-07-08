"use client"
import React, { useState } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { useRouter } from 'next/navigation';
import TemplateCard from '../../components/template/TemplateCard';
import CategoryFilter from '../../components/template/CategoryFilter';
import PreviewModal from '../../components/template/PreviewModal';
import TemplatesHeader from '../../components/template/TemplatesHeader';
import TemplatesActionSection from '../../components/template/TemplatesActionSection';

interface Template {
  id: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  isPremium: boolean;
}

export default function TemplatesPage() {
  const { user, loading } = useAuth() || {};
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  React.useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  // Sample template data
  const templates: Template[] = [
    {
      id: 1,
      name: "Modern Professional",
      description: "Clean and contemporary design perfect for tech and business professionals",
      category: "Modern",
      rating: 4.8,
      isPremium: false
    },
    {
      id: 2,
      name: "Creative Portfolio",
      description: "Bold and artistic layout ideal for designers and creative professionals",
      category: "Creative",
      rating: 4.9,
      isPremium: true
    },
    {
      id: 3,
      name: "Executive Classic",
      description: "Traditional and elegant format for senior-level positions",
      category: "Professional",
      rating: 4.7,
      isPremium: false
    },
    {
      id: 4,
      name: "Minimalist Clean",
      description: "Simple and focused design that highlights your content",
      category: "Modern",
      rating: 4.6,
      isPremium: false
    },
    {
      id: 5,
      name: "Tech Specialist",
      description: "Technical layout optimized for developers and engineers",
      category: "Modern",
      rating: 4.8,
      isPremium: true
    },
    {
      id: 6,
      name: "Academic Scholar",
      description: "Formal design suited for academic and research positions",
      category: "Professional",
      rating: 4.5,
      isPremium: false
    }
  ];

  const categories = ['All', 'Modern', 'Creative', 'Professional'];

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen w-full ">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <TemplatesHeader />

        {/* Category Filter */}
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate === template.id}
              onSelect={setSelectedTemplate}
              onPreview={handlePreview}
            />
          ))}
        </div>

        {/* Action Section */}
        <TemplatesActionSection />
      </div>

      {/* Preview Modal */}
      <PreviewModal 
        template={previewTemplate}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}