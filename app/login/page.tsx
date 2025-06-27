'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../components/AuthProvider';

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

  // Google Icon Component
  const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  // Floating shapes for background animation
  const FloatingShape = ({ className, delay = '0s' }) => (
    <div 
      className={`absolute rounded-full bg-gradient-to-r opacity-20 animate-float ${className}`}
      style={{ animationDelay: delay }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingShape 
          className="w-64 h-64 from-blue-400 to-purple-400 -top-32 -left-32" 
          delay="0s" 
        />
        <FloatingShape 
          className="w-48 h-48 from-purple-400 to-pink-400 top-1/4 right-1/4" 
          delay="2s" 
        />
        <FloatingShape 
          className="w-32 h-32 from-indigo-400 to-blue-400 bottom-1/4 left-1/4" 
          delay="4s" 
        />
        <FloatingShape 
          className="w-72 h-72 from-pink-400 to-purple-400 -bottom-36 -right-36" 
          delay="1s" 
        />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Content (Hidden on mobile) */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Build Your Dream Resume
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Create professional, ATS-friendly resumes with AI assistance. 
                Stand out from the crowd and land your dream job.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                  🤖
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">AI-Powered Writing</h3>
                <p className="text-sm text-gray-600">Get intelligent suggestions for bullet points and descriptions</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                  📊
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Resume Analytics</h3>
                <p className="text-sm text-gray-600">Track views, downloads, and optimize for ATS systems</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                  🎨
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Beautiful Templates</h3>
                <p className="text-sm text-gray-600">Choose from professionally designed templates</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                  ⚡
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Quick Export</h3>
                <p className="text-sm text-gray-600">Export to PDF, Word, or share with a custom link</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex space-x-8 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">10K+</div>
                <div className="text-sm text-gray-600">Resumes Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">24/7</div>
                <div className="text-sm text-gray-600">AI Support</div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="max-w-md mx-auto lg:mx-0 w-full space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left">
              {/* Logo */}
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  CV
                </div>
              </div>
              
              {/* Title and Subtitle - Mobile Only */}
              <div className="lg:hidden">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Welcome to SmartCV
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  Create professional resumes with AI assistance
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Sign in to get started with your career journey
                </p>
              </div>

              {/* Desktop Title */}
              <div className="hidden lg:block">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Sign in to SmartCV
                </h2>
                <p className="text-gray-600">
                  Welcome back! Please sign in to continue.
                </p>
              </div>
            </div>

            {/* Login Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6">
              {/* Features Preview - Mobile Only */}
              <div className="grid grid-cols-2 gap-4 mb-6 lg:hidden">
                <div className="text-center p-4 bg-blue-50/50 rounded-2xl">
                  <div className="text-2xl mb-2">🤖</div>
                  <p className="text-sm font-medium text-gray-700">AI-Powered</p>
                  <p className="text-xs text-gray-500">Smart suggestions</p>
                </div>
                <div className="text-center p-4 bg-purple-50/50 rounded-2xl">
                  <div className="text-2xl mb-2">📊</div>
                  <p className="text-sm font-medium text-gray-700">Analytics</p>
                  <p className="text-xs text-gray-500">Track performance</p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                  <div className="text-red-500">⚠️</div>
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* Google Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                    <span>Signing you in...</span>
                  </>
                ) : (
                  <>
                    <GoogleIcon />
                    <span>Continue with Google</span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      →
                    </div>
                  </>
                )}
              </button>

              {/* Additional Info */}
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <div className="w-8 h-px bg-gray-300"></div>
                  <span>Secure & Private</span>
                  <div className="w-8 h-px bg-gray-300"></div>
                </div>
                
                <div className="flex justify-center space-x-6 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <span>🔒</span>
                    <span>Encrypted</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>⚡</span>
                    <span>Fast Setup</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>🎯</span>
                    <span>No Spam</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500">
              <p>
                By signing in, you agree to our{' '}
                <button className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2">
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}