import { supabase } from '../lib/supabaseClient';

export async function saveResume(userId: string, data: any) {
  const { error, data: result } = await supabase
    .from('resumes')
    .insert([{ user_id: userId, data }]);
  if (error) throw error;
  return result;
} 