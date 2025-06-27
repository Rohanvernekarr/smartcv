import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Supabase Storage helpers
export async function uploadResumeFile(userId: string, file: File, type: 'pdf' | 'docx' | 'json') {
  const ext = type === 'pdf' ? 'pdf' : type === 'docx' ? 'docx' : 'json';
  const filePath = `${userId}/resumes/${Date.now()}.${ext}`;
  const { data, error } = await supabase.storage.from('resumes').upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  return data?.path;
}

export function getPublicResumeUrl(path: string) {
  return supabase.storage.from('resumes').getPublicUrl(path).data.publicUrl;
}

export async function downloadResumeFile(path: string) {
  const { data, error } = await supabase.storage.from('resumes').download(path);
  if (error) throw error;
  return data;
} 