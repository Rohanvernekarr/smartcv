'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../components/AuthProvider';
import LoginHero from '../../components/LoginHero';
import LoginForm from '../../components/LoginForm';

export default function LoginPage() {
  const { user } = useAuth() || {};
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) router.replace('/dashboard');
  }, [user, router]);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        setError('Failed to sign in. Please try again.');
        console.error('Login error:', error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-mono px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <LoginHero />
          <LoginForm 
            error={error}
            isLoading={isLoading}
            onLogin={handleLogin}
          />
        </div>
      </div>
    </div>
  );
}