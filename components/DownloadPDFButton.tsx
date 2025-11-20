import React from 'react';

export default function DownloadPDFButton({ previewRef, fileName = 'resume.pdf' }: { previewRef: React.RefObject<HTMLDivElement | null>, fileName?: string }) {
  const handleDownload = async () => {
    if (!previewRef.current) {
      alert('Preview not found. Please fill in your resume details first.');
      return;
    }

    try {
      // @ts-expect-error: No types for html2pdf.js
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;
      
      // Use the ref directly - it already points to the resume content
      const resumeContent = previewRef.current;
      
      const opt = {
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
          scrollX: 0,
          windowHeight: resumeContent.scrollHeight
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { mode: 'avoid-all' }
      };

      await html2pdf().set(opt).from(resumeContent).save();
    } catch (err) {
      console.error('PDF download error:', err);
      alert('Failed to download PDF. Please try again. Error: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      style={{
        backgroundColor: '#18181b',
        color: '#ffffff',
        padding: '0.625rem 1.5rem',
        borderRadius: '0.5rem',
        fontWeight: '500',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#27272a'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#18181b'}
    >
      Download as PDF
    </button>
  );
} 