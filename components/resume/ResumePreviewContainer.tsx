import React from 'react';
import ResumePreview from './ResumePreview';

interface ResumePreviewContainerProps {
  previewData: unknown;
  selectedTemplate: string;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

export default function ResumePreviewContainer({ previewData, selectedTemplate, previewRef }: ResumePreviewContainerProps) {
  return (
    <div className="w-full lg:w-1/2 h-full overflow-hidden p-6 flex flex-col items-center justify-start">
      <div className="flex flex-col items-center w-full h-full overflow-y-auto">
        <div className="w-full flex justify-center">
          <div
            ref={previewRef}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e4e4e7',
              width: '100%',
              maxWidth: '794px'
            }}
          >
            <ResumePreview data={previewData} template={selectedTemplate} />
          </div>
        </div>
        <div className="mt-3 text-xs text-zinc-500">A4 size: 210mm × 297mm (794×1123px @ 96dpi)</div>
      </div>
    </div>
  );
} 