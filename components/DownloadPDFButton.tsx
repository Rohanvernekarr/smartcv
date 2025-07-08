import React from 'react';

export default function DownloadPDFButton({ previewRef, fileName = 'resume.pdf' }: { previewRef: React.RefObject<HTMLDivElement | null>, fileName?: string }) {
  const handleDownload = async () => {
    if (previewRef.current) {
      try {
        // @ts-expect-error: No types for html2pdf.js
        const html2pdfModule = await import('html2pdf.js');
        const html2pdf = html2pdfModule.default || html2pdfModule;
        html2pdf().from(previewRef.current).set({
          margin: 0.5,
          filename: fileName,
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        }).save();
      } catch (err) {
        alert('PDF download failed. See console for details.');
        console.error('PDF download error:', err);
      }
    } else {
      alert('Preview not found.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-2.5 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      Download as PDF
    </button>
  );
} 