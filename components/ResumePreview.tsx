import React from 'react';

interface ResumePreviewProps {
  data: any;
  template?: string;
}

export default function ResumePreview({ data, template = 'modern' }: ResumePreviewProps) {
  if (!data) return null;

  return (
    <div className="w-full flex justify-center items-start print:block overflow-hidden">
      <div
        className={`w-full max-w-[794px] min-h-[1123px] max-h-[1123px] overflow-y-auto bg-white p-10 shadow-2xl rounded-md border border-gray-300 font-sans text-gray-900 print:w-full print:min-h-fit print:max-h-fit print:overflow-visible print:shadow-none print:border-none ${template}`}
        style={{ boxSizing: 'border-box' }}
      >
        {/* Header */}
        <div className="flex flex-col items-center border-b pb-6 mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-1">{data.fullName}</h1>
          <div className="text-lg text-blue-700 font-semibold mb-2">{data.title}</div>
          <p className="text-gray-600 text-center max-w-2xl text-sm">{data.summary}</p>
        </div>

        {/* Work Experience */}
        {data.experience?.[0]?.company && (
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
                  <p className="text-gray-600 text-sm mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education?.[0]?.school && (
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
                  <p className="text-gray-600 text-sm mt-1">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Grid: Projects, Skills, Certifications, etc. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {Array.isArray(data.projects) && data.projects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 border-b pb-1 mb-3 uppercase tracking-wide">Projects</h2>
              <div className="space-y-3">
                {data.projects.map((proj: any, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">{proj.name}</span>
                      <span className="text-sm text-gray-500">{proj.start} - {proj.end}</span>
                    </div>
                    <div className="text-gray-700 font-medium">{proj.role}</div>
                    <p className="text-gray-600 text-sm mt-1">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.skills && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase text-xs tracking-wider">Skills</h3>
              <p className="text-gray-700 text-sm whitespace-pre-line">{data.skills}</p>
            </div>
          )}
          {data.certifications && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase text-xs tracking-wider">Certifications</h3>
              <p className="text-gray-700 text-sm whitespace-pre-line">{data.certifications}</p>
            </div>
          )}
          {data.awards && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase text-xs tracking-wider">Awards</h3>
              <p className="text-gray-700 text-sm whitespace-pre-line">{data.awards}</p>
            </div>
          )}
          {data.languages && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase text-xs tracking-wider">Languages</h3>
              <p className="text-gray-700 text-sm whitespace-pre-line">{data.languages}</p>
            </div>
          )}
          {data.social && (
            <div>
              <h3 className="font-bold text-gray-800 mb-1 uppercase text-xs tracking-wider">Social</h3>
              <p className="text-gray-700 text-sm whitespace-pre-line">{data.social}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
