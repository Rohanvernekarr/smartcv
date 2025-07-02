import React from 'react';
import ResumePreview from '../ResumePreview';

interface ResumePreviewContainerProps {
  previewData: any;
  selectedTemplate: string;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

export default function ResumePreviewContainer({ previewData, selectedTemplate, previewRef }: ResumePreviewContainerProps) {
  return (
    <div className="w-full lg:w-1/2 h-full overflow-y-auto p-4 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center w-full">
        <div
          ref={previewRef}
          className="bg-white shadow-2xl rounded-md border border-gray-300 print:shadow-none print:border-none"
          style={{ width: 794, height: 1123, boxSizing: 'border-box', margin: '0 auto', padding: 40 }}
        >
          <ResumePreview data={previewData} template={selectedTemplate} />
        </div>
        <div className="mt-2 text-xs text-gray-400">A4 size: 210mm × 297mm (794×1123px @ 96dpi)</div>
      </div>
    </div>
  );
} 