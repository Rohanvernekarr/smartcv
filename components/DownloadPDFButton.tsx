import React from 'react';

export default function DownloadPDFButton({ previewRef, fileName = 'resume.pdf' }: { previewRef: React.RefObject<HTMLDivElement | null>, fileName?: string }) {
  const handleDownload = async () => {
    if (previewRef.current) {
      try {
        // @ts-expect-error: No types for html2pdf.js
        let html2pdfModule = await import('html2pdf.js');
        const html2pdf = html2pdfModule.default || html2pdfModule;
        html2pdf().from(previewRef.current).set({
          margin: 0.5,
          filename: fileName,
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        }).save();
      } catch (err) {
        alert('PDF download failed. See console for details.');
        // eslint-disable-next-line no-console
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
      className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 mt-2"
    >
      Download as PDF
    </button>
  );
} 