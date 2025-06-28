'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Function to upsert user profile to the profiles table
async function upsertUserProfile(user: User) {
  try {
    const { id, email, user_metadata } = user;
    
    // Extract name from user metadata (for Google OAuth)
    const fullName = user_metadata?.full_name || user_metadata?.name || '';
    
    // Split full name into first and last name
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const { error } = await supabase
      .from('profiles')
      .upsert([
        {
          id,
          email,
          first_name: firstName,
          last_name: lastName,
          full_name: fullName,
          updated_at: new Date().toISOString()
        }
      ], {
        onConflict: 'id'
      });

    if (error) {
      console.error('Error upserting profile:', error);
    } else {
      console.log('Profile saved successfully');
    }
  } catch (error) {
    console.error('Error saving profile:', error);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setLoading(false);

      // Save profile when user signs in
      if (currentUser && event === 'SIGNED_IN') {
        await upsertUserProfile(currentUser);
      }
    });

    // Get initial user and save profile if exists
    supabase.auth.getUser().then(async ({ data }: { data: { user: User | null } }) => {
      const currentUser = data?.user ?? null;
      setUser(currentUser);
      setLoading(false);

      // Save profile for existing user
      if (currentUser) {
        await upsertUserProfile(currentUser);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 