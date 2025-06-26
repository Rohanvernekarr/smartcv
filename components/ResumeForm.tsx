import React, { useState, useRef } from 'react';

const emptyExperience = { company: '', role: '', start: '', end: '', description: '' };
const emptyEducation = { school: '', degree: '', start: '', end: '', description: '' };

export default function ResumeForm({ onSave, onChange }: { onSave?: (data: any) => void, onChange?: (data: any) => void }) {
  const [form, setForm] = useState({
    fullName: '',
    title: '',
    summary: '',
    experience: [emptyExperience],
    education: [emptyEducation],
    skills: '',
    certifications: '',
    projects: '',
    awards: '',
    languages: '',
    social: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    onChange?.(updated);
  };

  const handleArrayChange = (section: 'experience' | 'education', idx: number, field: string, value: string) => {
    const updated = {
      ...form,
      [section]: form[section].map((item: any, i: number) => i === idx ? { ...item, [field]: value } : item),
    };
    setForm(updated);
    onChange?.(updated);
  };

  const addArrayItem = (section: 'experience' | 'education', empty: any) => {
    const updated = { ...form, [section]: [...form[section], empty] };
    setForm(updated);
    onChange?.(updated);
  };

  const removeArrayItem = (section: 'experience' | 'education', idx: number) => {
    const updated = { ...form, [section]: form[section].filter((_: any, i: number) => i !== idx) };
    setForm(updated);
    onChange?.(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(form);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Placeholder: handle file upload and parsing here
    alert('Resume upload coming soon!');
  };

  return (
    <form className="card space-y-8 relative" onSubmit={handleSubmit}>
      <button
        type="button"
        className="absolute right-8 top-8 button-secondary flex items-center gap-2"
        onClick={() => fileInputRef.current?.click()}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 16v-8m0 0l-4 4m4-4l4 4"/><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
        Upload Resume
      </button>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <input name="fullName" value={form.fullName} onChange={handleChange} placeholder=" " className="input peer" required title="Full Name" />
          <label className="input-label">Full Name</label>
        </div>
        <div className="relative">
          <input name="title" value={form.title} onChange={handleChange} placeholder=" " className="input peer" required title="Title" />
          <label className="input-label">Title</label>
        </div>
      </div>
      <div className="relative">
        <textarea name="summary" value={form.summary} onChange={handleChange} placeholder=" " className="input peer" rows={3} title="Summary" />
        <label className="input-label">Summary</label>
      </div>
      <div>
        <div className="font-bold text-lg text-blue-700 mb-2">Work Experience</div>
        <div className="space-y-4">
          {form.experience.map((exp, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <div className="relative">
                  <input value={exp.company} onChange={e => handleArrayChange('experience', idx, 'company', e.target.value)} placeholder=" " className="input peer" title="Company" />
                  <label className="input-label">Company</label>
                </div>
                <div className="relative">
                  <input value={exp.role} onChange={e => handleArrayChange('experience', idx, 'role', e.target.value)} placeholder=" " className="input peer" title="Role" />
                  <label className="input-label">Role</label>
                </div>
                <div className="relative">
                  <input value={exp.start} onChange={e => handleArrayChange('experience', idx, 'start', e.target.value)} placeholder=" " className="input peer" title="Start" />
                  <label className="input-label">Start</label>
                </div>
                <div className="relative">
                  <input value={exp.end} onChange={e => handleArrayChange('experience', idx, 'end', e.target.value)} placeholder=" " className="input peer" title="End" />
                  <label className="input-label">End</label>
                </div>
              </div>
              <div className="relative">
                <textarea value={exp.description} onChange={e => handleArrayChange('experience', idx, 'description', e.target.value)} placeholder=" " className="input peer" rows={2} title="Description" />
                <label className="input-label">Description</label>
              </div>
              {form.experience.length > 1 && <button type="button" onClick={() => removeArrayItem('experience', idx)} className="absolute top-2 right-2 text-xs text-red-500 hover:underline">Remove</button>}
            </div>
          ))}
        </div>
        <button type="button" onClick={() => addArrayItem('experience', emptyExperience)} className="button-secondary mt-2">+ Add Experience</button>
      </div>
      <div>
        <div className="font-bold text-lg text-blue-700 mb-2">Education</div>
        <div className="space-y-4">
          {form.education.map((edu, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <div className="relative">
                  <input value={edu.school} onChange={e => handleArrayChange('education', idx, 'school', e.target.value)} placeholder=" " className="input peer" title="School" />
                  <label className="input-label">School</label>
                </div>
                <div className="relative">
                  <input value={edu.degree} onChange={e => handleArrayChange('education', idx, 'degree', e.target.value)} placeholder=" " className="input peer" title="Degree" />
                  <label className="input-label">Degree</label>
                </div>
                <div className="relative">
                  <input value={edu.start} onChange={e => handleArrayChange('education', idx, 'start', e.target.value)} placeholder=" " className="input peer" title="Start" />
                  <label className="input-label">Start</label>
                </div>
                <div className="relative">
                  <input value={edu.end} onChange={e => handleArrayChange('education', idx, 'end', e.target.value)} placeholder=" " className="input peer" title="End" />
                  <label className="input-label">End</label>
                </div>
              </div>
              <div className="relative">
                <textarea value={edu.description} onChange={e => handleArrayChange('education', idx, 'description', e.target.value)} placeholder=" " className="input peer" rows={2} title="Description" />
                <label className="input-label">Description</label>
              </div>
              {form.education.length > 1 && <button type="button" onClick={() => removeArrayItem('education', idx)} className="absolute top-2 right-2 text-xs text-red-500 hover:underline">Remove</button>}
            </div>
          ))}
        </div>
        <button type="button" onClick={() => addArrayItem('education', emptyEducation)} className="button-secondary mt-2">+ Add Education</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <input name="skills" value={form.skills} onChange={handleChange} placeholder=" " className="input peer" title="Skills (comma separated)" />
          <label className="input-label">Skills (comma separated)</label>
        </div>
        <div className="relative">
          <input name="certifications" value={form.certifications} onChange={handleChange} placeholder=" " className="input peer" title="Certifications" />
          <label className="input-label">Certifications</label>
        </div>
        <div className="relative">
          <input name="projects" value={form.projects} onChange={handleChange} placeholder=" " className="input peer" title="Projects" />
          <label className="input-label">Projects</label>
        </div>
        <div className="relative">
          <input name="awards" value={form.awards} onChange={handleChange} placeholder=" " className="input peer" title="Awards" />
          <label className="input-label">Awards</label>
        </div>
        <div className="relative">
          <input name="languages" value={form.languages} onChange={handleChange} placeholder=" " className="input peer" title="Languages" />
          <label className="input-label">Languages</label>
        </div>
        <div className="relative">
          <input name="social" value={form.social} onChange={handleChange} placeholder=" " className="input peer" title="Social Links" />
          <label className="input-label">Social Links</label>
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="button-primary">Save Resume</button>
      </div>
    </form>
  );
} 