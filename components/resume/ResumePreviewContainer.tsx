import React from 'react';
import ResumePreview from '../ResumePreview';

interface ResumePreviewContainerProps {
  previewData: unknown;
  selectedTemplate: string;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

export default function ResumePreviewContainer({ previewData, selectedTemplate, previewRef }: ResumePreviewContainerProps) {
  return (
    <div className="w-full lg:w-1/2 h-full overflow-y-auto p-4 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex justify-center">
          <div
            ref={previewRef}
            className="bg-white shadow-2xl rounded-md border border-gray-300 print:shadow-none print:border-none w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[794px]"
            style={{
              aspectRatio: '794/1123',
              boxSizing: 'border-box',
              margin: '0 auto',
              padding: 16,
            }}
          >
            <ResumePreview data={previewData} template={selectedTemplate} />
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-400">A4 size: 210mm × 297mm (794×1123px @ 96dpi)</div>
      </div>
    </div>
  );
} 