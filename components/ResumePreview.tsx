import React from 'react';

interface ResumePreviewProps {
  data: any;
  template?: string;
}

export default function ResumePreview({ data, template = 'modern' }: ResumePreviewProps) {
  if (!data) return null;

  return (
    <div className="flex justify-center print:block">
      <div
        className={`bg-white w-[794px] h-[1123px] p-10 shadow-2xl rounded-md border border-gray-300 font-sans text-gray-900 print:w-full print:h-auto print:shadow-none print:border-none ${template}`}
        style={{ boxSizing: 'border-box' }}
      >
        {/* Header */}
        <div className="flex flex-col items-center border-b pb-6 mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-1">{data.fullName}</h1>
          <div className="text-lg text-blue-700 font-semibold mb-2">{data.title}</div>
          <div className="text-gray-600 text-center max-w-2xl">{data.summary}</div>
        </div>

        {/* Experience */}
        {data.experience && data.experience[0]?.company && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-1 mb-3 uppercase tracking-wide">Work Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">{exp.role}</span>
                    <span className="text-sm text-gray-500">{exp.start} - {exp.end}</span>
                  </div>
                  <div className="text-gray-700 font-medium">{exp.company}</div>
                  <div className="text-gray-600 text-sm mt-1">{exp.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education[0]?.school && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-1 mb-3 uppercase tracking-wide">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">{edu.degree}</span>
                    <span className="text-sm text-gray-500">{edu.start} - {edu.end}</span>
                  </div>
                  <div className="text-gray-700 font-medium">{edu.school}</div>
                  <div className="text-gray-600 text-sm mt-1">{edu.description}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Other Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {data.skills && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase text-xs tracking-wider">Skills</h3>
              <div className="text-gray-700 text-sm">{data.skills}</div>
            </div>
          )}
          {data.certifications && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase text-xs tracking-wider">Certifications</h3>
              <div className="text-gray-700 text-sm">{data.certifications}</div>
            </div>
          )}
          {data.projects && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase text-xs tracking-wider">Projects</h3>
              <div className="text-gray-700 text-sm">{data.projects}</div>
            </div>
          )}
          {data.awards && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase text-xs tracking-wider">Awards</h3>
              <div className="text-gray-700 text-sm">{data.awards}</div>
            </div>
          )}
          {data.languages && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase text-xs tracking-wider">Languages</h3>
              <div className="text-gray-700 text-sm">{data.languages}</div>
            </div>
          )}
          {data.social && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase text-xs tracking-wider">Social</h3>
              <div className="text-gray-700 text-sm">{data.social}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
