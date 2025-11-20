import { supabase } from '../lib/supabaseClient';

// Save a new resume (draft or complete)
export async function saveResume(userId: string, data: unknown, status: 'draft' | 'complete' = 'draft', fileUrl?: string) {
  const { error, data: result } = await supabase
    .from('resumes')
    .insert([{ user_id: userId, data, status, file_url: fileUrl || null }])
    .select();
  if (error) throw error;
  return result;
}

// Update an existing resume (by id)
export async function updateResume(resumeId: string, data: unknown, status?: 'draft' | 'complete', fileUrl?: string) {
  const updateObj: Record<string, unknown> = { data, updated_at: new Date().toISOString() };
  if (status) updateObj.status = status;
  if (fileUrl) updateObj.file_url = fileUrl;
  const { error, data: result } = await supabase
    .from('resumes')
    .update(updateObj)
    .eq('id', resumeId)
    .select();
  if (error) throw error;
  return result;
}

// Get all resumes for a user
export async function getUserResumes(userId: string, limit = 20) {
  const { error, data } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

// Get a single resume by id
export async function getResumeById(resumeId: string) {
  const { error, data } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', resumeId)
    .single();
  if (error) throw error;
  return data;
}

// Save a file URL to a resume record
export async function saveResumeFileUrl(resumeId: string, fileUrl: string) {
  const { error, data } = await supabase
    .from('resumes')
    .update({ file_url: fileUrl })
    .eq('id', resumeId);
  if (error) throw error;
  return data;
}

// Delete a resume by id
export async function deleteResume(resumeId: string) {
  const { error } = await supabase
    .from('resumes')
    .delete()
    .eq('id', resumeId);
  if (error) throw error;
  return true;
} 