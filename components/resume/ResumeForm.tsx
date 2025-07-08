import React, { useState, useRef } from "react";
import {
  Upload,
  Plus,
  X,
  Save,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Link2,
} from "lucide-react";

const emptyExperience = {
  company: "",
  role: "",
  start: "",
  end: "",
  description: "",
};
const emptyEducation = {
  school: "",
  degree: "",
  start: "",
  end: "",
  description: "",
};
const emptyProject = {
  name: "",
  role: "",
  start: "",
  end: "",
  description: "",
};

export default function ResumeForm({
  onSave,
  onChange,
}: {
  onSave?: (data: unknown, file?: File | null) => void;
  onChange?: (data: unknown) => void;
}) {
  const [form, setForm] = useState({
    fullName: "",
    title: "",
    summary: "",
    experience: [emptyExperience],
    education: [emptyEducation],
    projects: [emptyProject],
    skills: "",
    certifications: "",
    awards: "",
    languages: "",
    social: "",
  });
  const [activeSection, setActiveSection] = useState("personal");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Restore form state from localStorage on mount
  React.useEffect(() => {
    const savedForm = localStorage.getItem("resume_form_state");
    if (savedForm) {
      try {
        const parsed = JSON.parse(savedForm);
        setForm(parsed);
        onChange?.(parsed);
      } catch {}
    }
  }, [onChange]);

  // Persist form state to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem("resume_form_state", JSON.stringify(form));
  }, [form]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    onChange?.(updated);
  };

  const handleArrayChange = (
    section: "experience" | "education" | "projects",
    idx: number,
    field: string,
    value: string
  ) => {
    const updated = {
      ...form,
      [section]: form[section].map((item: unknown, i: number) =>
        i === idx ? { ...item, [field]: value } : item
      ),
    };
    setForm(updated);
    onChange?.(updated);
  };

  const addArrayItem = (
    section: "experience" | "education" | "projects",
    empty: unknown
  ) => {
    const updated = { ...form, [section]: [...form[section], empty] };
    setForm(updated);
    onChange?.(updated);
  };

  const removeArrayItem = (
    section: "experience" | "education" | "projects",
    idx: number
  ) => {
    const updated = {
      ...form,
      [section]: form[section].filter((_: unknown, i: number) => i !== idx),
    };
    setForm(updated);
    onChange?.(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(form, uploadedFile);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleClearAll = () => {
    setForm({
      fullName: "",
      title: "",
      summary: "",
      experience: [emptyExperience],
      education: [emptyEducation],
      projects: [emptyProject],
      skills: "",
      certifications: "",
      awards: "",
      languages: "",
      social: "",
    });
    setUploadedFile(null);
    localStorage.removeItem("resume_form_state");
    onChange?.({
      fullName: "",
      title: "",
      summary: "",
      experience: [emptyExperience],
      education: [emptyEducation],
      projects: [emptyProject],
      skills: "",
      certifications: "",
      awards: "",
      languages: "",
      social: "",
    });
  };

  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "project", label: "Projects", icon: GraduationCap },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "additional", label: "Additional", icon: Award },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Upload */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Build Your Resume
          </h2>
          <p className="text-gray-600 mt-1">
            Fill in your details to create a professional resume
          </p>
        </div>
        <div className="relative group inline-block">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors shadow-sm"
          >
            <Upload size={18} />
            <span className="font-medium">Upload Resume</span>
          </button>

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-zinc-600 text-white text-sm rounded px-2 py-1 whitespace-nowrap shadow-lg z-10">
            Coming soon
          </div>
        </div>

        <input
          title="label"
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {sections.map((section) => {
          const IconComponent = section.icon;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all flex-1 justify-center ${
                activeSection === section.id
                  ? "bg-white text-blue-600 shadow-sm font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <IconComponent size={16} />
              <span className="text-sm">{section.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        {activeSection === "personal" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Professional Title *
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g., Software Engineer, Marketing Manager"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Professional Summary
              </label>
              <textarea
                name="summary"
                value={form.summary}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Write a brief summary of your professional background and key achievements..."
              />
              <p className="text-xs text-gray-500">
                2-3 sentences highlighting your expertise and career goals
              </p>
            </div>
          </div>
        )}

        {/* Work Experience */}
        {activeSection === "experience" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Work Experience
              </h3>
              <button
                type="button"
                onClick={() => addArrayItem("experience", emptyExperience)}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus size={16} />
                Add Experience
              </button>
            </div>
            <div className="space-y-6">
              {form.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-gray-50 rounded-xl border border-gray-100 relative"
                >
                  {form.experience.length > 1 && (
                    <button
                      title="label"
                      type="button"
                      onClick={() => removeArrayItem("experience", idx)}
                      className="absolute top-4 right-4 p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Company
                      </label>
                      <input
                        value={exp.company}
                        onChange={(e) =>
                          handleArrayChange(
                            "experience",
                            idx,
                            "company",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <input
                        value={exp.role}
                        onChange={(e) =>
                          handleArrayChange(
                            "experience",
                            idx,
                            "role",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Job title"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        value={exp.start}
                        onChange={(e) =>
                          handleArrayChange(
                            "experience",
                            idx,
                            "start",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        value={exp.end}
                        onChange={(e) =>
                          handleArrayChange(
                            "experience",
                            idx,
                            "end",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="MM/YYYY or Present"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={exp.description}
                      onChange={(e) =>
                        handleArrayChange(
                          "experience",
                          idx,
                          "description",
                          e.target.value
                        )
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Describe your key responsibilities and achievements..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "project" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Projects</h3>
              <button
                type="button"
                onClick={() => addArrayItem("projects", emptyProject)}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus size={16} />
                Add Project
              </button>
            </div>
            <div className="space-y-6">
              {form.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-gray-50 rounded-xl border border-gray-100 relative"
                >
                  {form.projects.length > 1 && (
                    <button
                      title="label"
                      type="button"
                      onClick={() => removeArrayItem("projects", idx)}
                      className="absolute top-4 right-4 p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Project Name
                      </label>
                      <input
                        value={proj.name}
                        onChange={(e) =>
                          handleArrayChange(
                            "projects",
                            idx,
                            "name",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Project name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <input
                        value={proj.role}
                        onChange={(e) =>
                          handleArrayChange(
                            "projects",
                            idx,
                            "role",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your role in the project"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        value={proj.start}
                        onChange={(e) =>
                          handleArrayChange(
                            "projects",
                            idx,
                            "start",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        value={proj.end}
                        onChange={(e) =>
                          handleArrayChange(
                            "projects",
                            idx,
                            "end",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="MM/YYYY or Present"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={proj.description}
                      onChange={(e) =>
                        handleArrayChange(
                          "projects",
                          idx,
                          "description",
                          e.target.value
                        )
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Describe the project, your contributions, and outcomes..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {activeSection === "education" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Education</h3>
              <button
                type="button"
                onClick={() => addArrayItem("education", emptyEducation)}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus size={16} />
                Add Education
              </button>
            </div>
            <div className="space-y-6">
              {form.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-gray-50 rounded-xl border border-gray-100 relative"
                >
                  {form.education.length > 1 && (
                    <button
                      title="label"
                      type="button"
                      onClick={() => removeArrayItem("education", idx)}
                      className="absolute top-4 right-4 p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        School/University
                      </label>
                      <input
                        value={edu.school}
                        onChange={(e) =>
                          handleArrayChange(
                            "education",
                            idx,
                            "school",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Institution name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Degree
                      </label>
                      <input
                        value={edu.degree}
                        onChange={(e) =>
                          handleArrayChange(
                            "education",
                            idx,
                            "degree",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Degree and field of study"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        value={edu.start}
                        onChange={(e) =>
                          handleArrayChange(
                            "education",
                            idx,
                            "start",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        value={edu.end}
                        onChange={(e) =>
                          handleArrayChange(
                            "education",
                            idx,
                            "end",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="MM/YYYY or Expected"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Description (Optional)
                    </label>
                    <textarea
                      value={edu.description}
                      onChange={(e) =>
                        handleArrayChange(
                          "education",
                          idx,
                          "description",
                          e.target.value
                        )
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Relevant coursework, achievements, GPA..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Information */}
        {activeSection === "additional" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Award size={16} />
                  Skills
                </label>
                <input
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="JavaScript, React, Python, etc."
                />
                <p className="text-xs text-gray-700">
                  Separate skills with commas
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Certifications
                </label>
                <input
                  name="certifications"
                  value={form.certifications}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="AWS Certified, PMP, etc."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Awards & Achievements
                </label>
                <input
                  name="awards"
                  value={form.awards}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Recognition, honors, achievements"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Languages size={16} />
                  Languages
                </label>
                <input
                  name="languages"
                  value={form.languages}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="English (Native), Spanish (Fluent)"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Link2 size={16} />
                  Social Links
                </label>
                <input
                  name="social"
                  value={form.social}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 text-gray-700  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="LinkedIn, GitHub, Portfolio URL"
                />
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClearAll}
            className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium shadow-sm"
          >
            <X size={18} />
            Clear All
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm ml-4"
          >
            <Save size={18} />
            Save Resume
          </button>
        </div>
      </form>
    </div>
  );
}
