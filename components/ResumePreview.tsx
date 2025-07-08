import React from "react";

interface ResumePreviewProps {
  data: unknown;
  template?: string;
}

export default function ResumePreview({
  data,
  template = "modern",
}: ResumePreviewProps) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  const resume = data as Record<string, any>;

  const renderSection = (section: string, items: unknown[]) => {
    if (!items || items.length === 0) return null;

    return (
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-1 mb-3 uppercase tracking-wide">
          {section}
        </h2>
        <div className="space-y-4">
          {items.map((item: any, i: number) => (
            <div key={i}>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">
                  {item.role}
                </span>
                <span className="text-sm text-gray-500">
                  {item.start} - {item.end}
                </span>
              </div>
              <div className="text-gray-700 font-medium">{item.company}</div>
              <p className="text-gray-600 text-sm mt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="w-full flex justify-center items-start print:block overflow-hidden">
      <div
        className={`w-full max-w-[794px] min-h-[1123px] max-h-[1123px] overflow-y-auto bg-white p-10 shadow-2xl rounded-md border border-gray-300 font-sans text-gray-900 print:w-full print:min-h-fit print:max-h-fit print:overflow-visible print:shadow-none print:border-none ${template}`}
        style={{ boxSizing: "border-box" }}
      >
        {/* Header */}
        <div className="flex flex-col items-center border-b pb-6 mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-1">
            {resume.fullName}
          </h1>
          <div className="text-lg text-blue-700 font-semibold mb-2">
            {resume.title}
          </div>
          <p className="text-gray-600 text-center max-w-2xl text-sm">
            {resume.summary}
          </p>
        </div>

        {/* Work Experience */}
        {resume.experience?.[0]?.company &&
          renderSection('Work Experience', resume.experience as unknown[])}

        {/* Education */}
        {resume.education?.[0]?.school &&
          renderSection('Education', resume.education as unknown[])}

        {resume.projects?.[0]?.name &&
          renderSection('Projects', resume.projects as unknown[])}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {resume.skills && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase text-xs tracking-wider">
                Skills
              </h3>
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {resume.skills}
              </p>
            </div>
          )}
          {resume.certifications && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase text-xs tracking-wider">
                Certifications
              </h3>
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {resume.certifications}
              </p>
            </div>
          )}
          {resume.awards && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase text-xs tracking-wider">
                Awards
              </h3>
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {resume.awards}
              </p>
            </div>
          )}
          {resume.languages && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase text-xs tracking-wider">
                Languages
              </h3>
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {resume.languages}
              </p>
            </div>
          )}
          {resume.social && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase text-xs tracking-wider">
                Social
              </h3>
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {resume.social}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
