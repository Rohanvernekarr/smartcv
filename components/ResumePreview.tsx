import React from "react";

interface Experience {
  role?: string;
  start?: string;
  end?: string;
  company?: string;
  description?: string;
  school?: string;
  degree?: string;
  name?: string;
  github?: string;
  live?: string;
}

interface Link {
  label?: string;
  url?: string;
}

interface Skill {
  category?: string;
  items?: string;
}

interface Resume {
  fullName?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  links?: Link[];
  summary?: string;
  experience?: Experience[];
  education?: Experience[];
  projects?: Experience[];
  skills?: Skill[];
  certifications?: { name: string; date: string; }[];
  awards?: string;
  languages?: string;
  social?: string;
}

interface ResumePreviewProps {
  data: unknown;
  template?: string;
}

export default function ResumePreview({
  data,
  template = "modern",
}: ResumePreviewProps) {
  function isResume(obj: unknown): obj is Resume {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
    return 'fullName' in obj || 'title' in obj || 'summary' in obj;
  }
  
  if (!isResume(data)) return null;
  const resume = data;

  // Helper to render bullet points from description
  const renderDescription = (description?: string) => {
    if (!description) return null;
    const lines = description.split('\n').filter(line => line.trim());
    if (lines.length === 0) return null;
    
    return (
      <ul style={{ marginLeft: 0, fontSize: '13px', lineHeight: '1.4', color: '#3f3f46', wordWrap: 'break-word', overflowWrap: 'break-word', width: '100%' }}>
        {lines.map((line, i) => {
          const cleanLine = line.trim().replace(/^[•\-\*]\s*/, '');
          return (
            <li key={i} style={{ display: 'flex', marginBottom: '2px', width: '100%' }}>
              <span style={{ marginRight: '8px', flexShrink: 0 }}>•</span>
              <span style={{ flex: 1, wordWrap: 'break-word', overflowWrap: 'break-word', minWidth: 0 }}>{cleanLine}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflow: 'hidden' }}>
      <div
        style={{ 
          boxSizing: "border-box", 
          fontFamily: "Arial, sans-serif",
          width: '100%',
          backgroundColor: '#ffffff',
          padding: '32px 40px',
          color: '#18181b',
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
        }}
      >
        {/* Header - Name Section */}
        <div style={{ textAlign: 'center', marginBottom: '10px', paddingBottom: '12px' }}>
          <h1 style={{ fontSize: '23px', fontWeight: 'bold', color: '#18181b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.025em' }}>
            {resume.fullName || 'NAME SURNAME'}
          </h1>
          {/* Contact Info Line */}
          <div style={{ fontSize: '13px', color: '#3f3f46', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            {resume.phone && <span>{resume.phone}</span>}
            {resume.phone && (resume.email || (resume.links && resume.links.length > 0 && resume.links[0]?.url) || resume.location) && <span>|</span>}
            {resume.email && <span>{resume.email}</span>}
            {resume.email && ((resume.links && resume.links.length > 0 && resume.links[0]?.url) || resume.location) && <span>|</span>}
            {/* Display links with labels */}
            {resume.links && resume.links.length > 0 && resume.links.map((link, idx) => (
              link.url ? (
                <React.Fragment key={idx}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#3f3f46', textDecoration: 'underline' }}
                  >
                    {link.label || link.url}
                  </a>
                  {/* {idx < resume.links.length - 1 && resume.links[idx + 1]?.url && <span>|</span>} */}
                </React.Fragment>
              ) : null
            ))}
            {resume.links && resume.links.length > 0 && resume.links[0]?.url && resume.location && <span>|</span>}
            {resume.location && <span>{resume.location}</span>}
          </div>
        </div>

        {/* Summary Section */}
        {resume.summary && (
          <section style={{ marginBottom: '0px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#18181b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              SUMMARY
            </h2>
            <div style={{ borderTop: '1px solid #18181b', paddingTop: '8px' }}>
              <p style={{ color: '#3f3f46', fontSize: '13px', lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                {resume.summary}
              </p>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {resume.skills && Array.isArray(resume.skills) && resume.skills.length > 0 && resume.skills[0]?.category && (
          <section style={{ marginBottom: '0px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#18181b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              SKILLS
            </h2>
            <div style={{ borderTop: '1px solid #18181b', paddingTop: '8px' }}>
              {resume.skills.map((skill, i) => 
                skill.category && skill.items ? (
                  <p key={i} style={{ color: '#3f3f46', fontSize: '13px', lineHeight: '1.5', marginBottom: '4px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                    <span style={{ fontWeight: 'bold', color: '#18181b' }}>{skill.category}:</span> {skill.items}
                  </p>
                ) : null
              )}
            </div>
          </section>
        )}
        {/* Work Experience */}
        {resume.experience && resume.experience.length > 0 && resume.experience[0]?.company && (
          <section style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#18181b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              WORK EXPERIENCE
            </h2>
            <div style={{ borderTop: '1px solid #18181b', paddingTop: '8px' }}>
              {resume.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <h3 style={{ fontWeight: 'bold', color: '#18181b', fontSize: '13px', textTransform: 'uppercase' }}>
                      {exp.role}
                    </h3>
                    <span style={{ fontSize: '13px', color: '#3f3f46', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: '16px' }}>
                      {exp.start} – {exp.end}
                    </span>
                  </div>
                  <div style={{ fontSize: '15px', color: '#3f3f46',fontWeight: 'bold', fontStyle: 'italic', marginBottom: '8px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                    {exp.company}
                  </div>
                  {renderDescription(exp.description)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resume.projects && resume.projects.length > 0 && resume.projects[0]?.name && (
          <section style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#18181b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              PROJECTS
            </h2>
            <div style={{ borderTop: '1px solid #18181b', paddingTop: '8px' }}>
              {resume.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontWeight: 'bold', color: '#18181b', fontSize: '13px', textTransform: 'uppercase' }}>
                        {proj.name}
                      </h3>
                      {(proj.github || proj.live) && (
                        <span style={{ fontSize: '13px', color: '#3f3f46' }}>
                           <React.Fragment>
                          {proj.github && (
                            <>
                              <span>| </span>
                              <a 
                                href={proj.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ color: '#3f3f46', textDecoration: 'underline' }}
                              >
                                GitHub
                              </a>
                            </>
                          )}
                          </React.Fragment>
                           <React.Fragment>
                          {proj.live && (
                            <>
                              <span> | </span>
                              <a 
                                href={proj.live} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ color: '#3f3f46', textDecoration: 'underline' }}
                              >
                                Live
                              </a>
                            </>
                          )}
                          </React.Fragment>
                        </span>
                      )}
                    </div>
                    {(proj.start || proj.end) && (
                      <span style={{ fontSize: '13px', color: '#3f3f46', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: '16px' }}>
                        {proj.start} – {proj.end}
                      </span>
                    )}
                  </div>
                  {renderDescription(proj.description)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {resume.certifications && Array.isArray(resume.certifications) && resume.certifications.length > 0 && resume.certifications[0]?.name && (
          <section style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#18181b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              CERTIFICATIONS, TRAINING & ACHIEVEMENTS
            </h2>
            <div style={{ borderTop: '1px solid #18181b', paddingTop: '8px' }}>
              {resume.certifications.map((cert, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span style={{ color: '#3f3f46', fontSize: '13px', lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                    • {cert.name}
                  </span>
                  {cert.date && (
                    <span style={{ fontSize: '13px', color: '#3f3f46', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: '16px' }}>
                      {cert.date}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resume.education && resume.education.length > 0 && resume.education[0]?.school && (
          <section style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#18181b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              EDUCATIONAL QUALIFICATIONS
            </h2>
            <div style={{ borderTop: '1px solid #18181b', paddingTop: '8px' }}>
              {resume.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0' }}>
                    <h3 style={{ fontWeight: 'bold', color: '#18181b', fontSize: '13px', textTransform: 'uppercase' }}>
                      {edu.school}
                    </h3>
                    <span style={{ fontSize: '13px', color: '#3f3f46', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: '16px' }}>
                      {edu.start} – {edu.end}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#3f3f46', fontStyle: 'italic', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                    {edu.degree}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages Section */}
        {resume.languages && (
          <section style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#18181b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              LANGUAGES
            </h2>
            <div style={{ borderTop: '1px solid #18181b', paddingTop: '8px' }}>
              <p style={{ color: '#3f3f46', fontSize: '13px', lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                {resume.languages}
              </p>
            </div>
          </section>
        )}

        {/* Awards Section */}
        {resume.awards && (
          <section style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#18181b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              AWARDS & ACHIEVEMENTS
            </h2>
            <div style={{ borderTop: '1px solid #18181b', paddingTop: '8px' }}>
              <p style={{ color: '#3f3f46', fontSize: '13px', lineHeight: '1.5', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                {resume.awards}
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
