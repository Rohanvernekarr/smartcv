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
  grade: "",
};
const emptyProject = {
  name: "",
  role: "",
  start: "",
  end: "",
  description: "",
  github: "",
  live: "",
};
const emptyLink = {
  label: "",
  url: "",
};
const emptySkill = {
  category: "",
  items: "",
};
const emptyCertification = {
  name: "",
  date: "",
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
    phone: "",
    email: "",
    location: "",
    links: [emptyLink],
    summary: "",
    experience: [emptyExperience],
    education: [emptyEducation],
    projects: [emptyProject],
    skills: [emptySkill],
    certifications: [emptyCertification],
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
  }, []); // <--- Only run once on mount

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
    section: "experience" | "education" | "projects" | "links" | "skills" | "certifications",
    idx: number,
    field: string,
    value: string
  ) => {
    const updated = {
      ...form,
      [section]: form[section].map((item: unknown, i: number) =>
        i === idx ? { ...(item as Record<string, unknown>), [field]: value } : item
      ),
    };
    setForm(updated);
    onChange?.(updated);
  };

  const addArrayItem = (
    section: "experience" | "education" | "projects" | "links" | "skills" | "certifications",
    empty: unknown
  ) => {
    const updated = { ...form, [section]: [...form[section], empty] };
    setForm(updated);
    onChange?.(updated);
  };

  const removeArrayItem = (
    section: "experience" | "education" | "projects" | "links" | "skills" | "certifications",
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
    setUploadedFile(null);
    localStorage.removeItem("resume_form_state");
    onChange?.({
      fullName: "",
      title: "",
      phone: "",
      email: "",
      location: "",
      links: [emptyLink],
      summary: "",
      experience: [emptyExperience],
      education: [emptyEducation],
      projects: [emptyProject],
      skills: [emptySkill],
      certifications: [emptyCertification],
      awards: "",
      languages: "",
      social: "",
    });
  };

  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "skills", label: "Skills", icon: Award },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "project", label: "Projects", icon: GraduationCap },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "additional", label: "Additional", icon: Award },
  ];

  return (
    <div className="space-y-6">
     

      {/* Section Navigation */}
      <div className="flex flex-row flex-nowrap overflow-x-auto space-x-1 bg-zinc-100 p-1 rounded-lg scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-100">
        {sections.map((section) => {
          const IconComponent = section.icon;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 min-w-[120px] rounded-md transition-all flex-shrink-0 justify-center ${
                activeSection === section.id
                  ? "bg-white text-zinc-900 shadow-sm font-medium border border-zinc-200"
                  : "text-zinc-600 hover:text-zinc-900"
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
                <label className="text-sm font-medium text-zinc-700">
                  Full Name *
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
             
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">
                Professional Summary
              </label>
              <textarea
                name="summary"
                value={form.summary}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent transition-all resize-none"
                placeholder="Write a brief summary of your professional background and key achievements..."
              />
              <p className="text-xs text-zinc-500">
                2-3 sentences highlighting your expertise and career goals
              </p>
            </div>
             {/* Professional Links Section */}
            <div className="space-y-4 pt-6 border-t border-zinc-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
                  <Link2 size={18} />
                  Professional Links
                </h3>
                <button
                  type="button"
                  onClick={() => addArrayItem("links", emptyLink)}
                  className="flex items-center gap-2 px-4 py-2 text-zinc-700 bg-zinc-100 border border-zinc-300 rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  <Plus size={16} />
                  Add Link
                </button>
              </div>
              <p className="text-xs text-zinc-500">
                Add links to your LinkedIn, Portfolio Website, GitHub, etc.
              </p>
              <div className="space-y-4">
                {form.links.map((link: { label: string; url: string }, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 bg-zinc-50 rounded-lg border border-zinc-200 relative"
                  >
                    {form.links.length > 1 && (
                      <button
                        title="Remove link"
                        type="button"
                        onClick={() => removeArrayItem("links", idx)}
                        className="absolute top-3 right-3 p-1 text-zinc-400 hover:text-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700">
                          Link Label
                        </label>
                        <input
                          value={link.label}
                          onChange={(e) =>
                            handleArrayChange(
                              "links",
                              idx,
                              "label",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                          placeholder="e.g., LinkedIn, GitHub, Portfolio"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700">
                          URL
                        </label>
                        <input
                          value={link.url}
                          onChange={(e) =>
                            handleArrayChange(
                              "links",
                              idx,
                              "url",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
             {/* Contact Information Section */}
            <div className="space-y-4 pt-6 border-t border-zinc-200">
              <h3 className="text-lg font-semibold text-zinc-900">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                    placeholder="+1-123-456-7890"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-zinc-700">
                    Location
                  </label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                    placeholder="City, State, Country"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === "skills" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-zinc-900">
              Skills
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
                  <Award size={16} />
                  Skill Categories
                </label>
                <button
                  type="button"
                  onClick={() => addArrayItem("skills", emptySkill)}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <Plus size={16} />
                  Add Skill Category
                </button>
              </div>
              {form.skills.map((skill, idx) => (
                <div key={idx} className="p-4 border border-zinc-200 rounded-lg bg-zinc-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-700">
                      Skill Category {idx + 1}
                    </span>
                    {form.skills.length > 1 && (
                      <button
                        title="Remove skill category"
                        type="button"
                        onClick={() => removeArrayItem("skills", idx)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  <input
                    value={skill.category}
                    onChange={(e) =>
                      handleArrayChange("skills", idx, "category", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                    placeholder="e.g., Technical skills, Web Development, Cloud"
                  />
                  <textarea
                    value={skill.items}
                    onChange={(e) =>
                      handleArrayChange("skills", idx, "items", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                    rows={2}
                    placeholder="e.g., TypeScript, JavaScript, Go, Python, Linux, Git, DSA."
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {activeSection === "experience" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-zinc-900">
                Work Experience
              </h3>
              <button
                type="button"
                onClick={() => addArrayItem("experience", emptyExperience)}
                className="flex items-center gap-2 px-4 py-2 text-zinc-700 bg-zinc-100 border border-zinc-300 rounded-lg hover:bg-zinc-200 transition-colors"
              >
                <Plus size={16} />
                Add Experience
              </button>
            </div>
            <div className="space-y-6">
              {form.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-zinc-50 rounded-lg border border-zinc-200 relative"
                >
                  {form.experience.length > 1 && (
                    <button
                      title="label"
                      type="button"
                      onClick={() => removeArrayItem("experience", idx)}
                      className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
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
                        className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                        placeholder="Company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
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
                        className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                        placeholder="Job title"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
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
                        className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
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
                        className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                        placeholder="MM/YYYY or Present"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">
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
                      className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent resize-none"
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
              <h3 className="text-xl font-semibold text-zinc-900">Projects</h3>
              <button
                type="button"
                onClick={() => addArrayItem("projects", emptyProject)}
                className="flex items-center gap-2 px-4 py-2 text-zinc-700 bg-zinc-100 border border-zinc-300 rounded-lg hover:bg-zinc-200 transition-colors"
              >
                <Plus size={16} />
                Add Project
              </button>
            </div>
            <div className="space-y-6">
              {form.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-zinc-50 rounded-lg border border-zinc-200 relative"
                >
                  {form.projects.length > 1 && (
                    <button
                      title="label"
                      type="button"
                      onClick={() => removeArrayItem("projects", idx)}
                      className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
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
                        className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                        placeholder="Project name"
                      />
                    </div>
                    {/* <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
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
                        className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                        placeholder="Your role in the project"
                      />
                    </div> */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
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
                        className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
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
                        className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                        placeholder="MM/YYYY or Present"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
                        GitHub URL (Optional)
                      </label>
                      <input
                        value={proj.github}
                        onChange={(e) =>
                          handleArrayChange(
                            "projects",
                            idx,
                            "github",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
                        Live URL (Optional)
                      </label>
                      <input
                        value={proj.live}
                        onChange={(e) =>
                          handleArrayChange(
                            "projects",
                            idx,
                            "live",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">
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
                      className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent resize-none"
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
              <h3 className="text-xl font-semibold text-zinc-900">Education</h3>
              <button
                type="button"
                onClick={() => addArrayItem("education", emptyEducation)}
                className="flex items-center gap-2 px-4 py-2 text-zinc-700 bg-zinc-100 border border-zinc-300 rounded-lg hover:bg-zinc-200 transition-colors"
              >
                <Plus size={16} />
                Add Education
              </button>
            </div>
            <div className="space-y-6">
              {form.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-zinc-50 rounded-lg border border-zinc-200 relative"
                >
                  {form.education.length > 1 && (
                    <button
                      title="label"
                      type="button"
                      onClick={() => removeArrayItem("education", idx)}
                      className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
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
                        className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                        placeholder="Institution name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
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
                        className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                        placeholder="Degree and field of study"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
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
                        className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                        placeholder="MM/YYYY"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
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
                        className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                        placeholder="MM/YYYY or Expected"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">
                        CGPA/Percentage (Optional)
                      </label>
                      <input
                        value={edu.grade}
                        onChange={(e) =>
                          handleArrayChange(
                            "education",
                            idx,
                            "grade",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                        placeholder="e.g., 3.8/4.0 or 85%"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">
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
                      className="w-full px-3 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent resize-none"
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
            <h3 className="text-xl font-semibold text-zinc-900">
              Additional Information
            </h3>
            
           

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-700">
                  Certifications
                </label>
                <button
                  type="button"
                  onClick={() => addArrayItem("certifications", emptyCertification)}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <Plus size={16} />
                  Add Certification
                </button>
              </div>
              {form.certifications.map((cert, idx) => (
                <div key={idx} className="p-4 border border-zinc-200 rounded-lg bg-zinc-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-700">
                      Certification {idx + 1}
                    </span>
                    {form.certifications.length > 1 && (
                      <button
                        title="Remove certification"
                        type="button"
                        onClick={() => removeArrayItem("certifications", idx)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      value={cert.name}
                      onChange={(e) =>
                        handleArrayChange("certifications", idx, "name", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                      placeholder="Certification name"
                    />
                    <input
                      value={cert.date}
                      onChange={(e) =>
                        handleArrayChange("certifications", idx, "date", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                      placeholder="Date (e.g., 2024)"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700">
                  Awards & Achievements
                </label>
                <input
                  name="awards"
                  value={form.awards}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                  placeholder="Recognition, honors, achievements"
                />
              </div>
              {/* <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
                  <Languages size={16} />
                  Languages
                </label>
                <input
                  name="languages"
                  value={form.languages}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-300 text-zinc-900 bg-white rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent"
                  placeholder="English (Native), Spanish (Fluent)"
                />
              </div> */}
            </div>

           

           
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end gap-4 pt-6 border-t border-zinc-200">
          <button
            type="button"
            onClick={handleClearAll}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors font-medium"
          >
            <X size={18} />
            Clear All
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors font-medium shadow-sm"
          >
            <Save size={18} />
            Save Resume
          </button>
        </div>
      </form>
    </div>
  );
}
