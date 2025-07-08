"use client"

import React, { createContext, useContext, useState, useCallback } from 'react';
import { getUserResumes } from '../db/resume';
import { useAuth } from './AuthProvider';

interface ResumeContextType {
  resumes: unknown[];
  setResumes: React.Dispatch<React.SetStateAction<unknown[]>>;
  isLoading: boolean;
  fetchResumes: () => Promise<void>;
}
const ResumeContext = createContext<ResumeContextType | null>(null);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth() || {};
  const [resumes, setResumes] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchResumes = useCallback(async () => {
    if (!user || !user.id) return;
    setIsLoading(true);
    try {
      const data = await getUserResumes(user.id);
      setResumes(data || []);
    } catch {
      // Optionally handle error
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Optionally, fetch on mount if user exists
  React.useEffect(() => {
    if (user && resumes.length === 0) {
      fetchResumes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <ResumeContext.Provider value={{ resumes, setResumes, isLoading, fetchResumes }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResumes() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumes must be used within a ResumeProvider');
  }
  return context;
} 