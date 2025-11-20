import React from 'react';

interface LoginFormProps {
  error: string;
  isLoading: boolean;
  onLogin: () => void;
}

export default function LoginForm({ error, isLoading, onLogin }: LoginFormProps) {
  const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  return (
    <div className="max-w-md mx-auto lg:mx-0 w-full space-y-8">
      
      <div className="text-center lg:text-left">
        <div className="flex justify-center lg:justify-start mb-6">
          <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            CV
          </div>
        </div>
        
        <div className="lg:hidden">
          <h1 className="text-4xl font-bold text-zinc-900 mb-2">
            Welcome to SmartCV
          </h1>
          <p className="text-lg text-zinc-700 font-medium">
            Create professional resumes with AI assistance
          </p>
          <p className="text-sm text-zinc-600 mt-2">
            Sign in to get started with your career journey
          </p>
        </div>

        <div className="hidden lg:block">
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">
            Sign in to SmartCV
          </h2>
          <p className="text-zinc-600">
            Welcome back! Please sign in to continue.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-zinc-200 p-8 space-y-6">
        <div className="grid grid-cols-2 gap-4 mb-6 lg:hidden">
          <div className="text-center p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
            <div className="text-2xl mb-2">🤖</div>
            <p className="text-sm font-medium text-zinc-900">AI-Powered</p>
            <p className="text-xs text-zinc-600">Smart suggestions</p>
          </div>
          <div className="text-center p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm font-medium text-zinc-900">Analytics</p>
            <p className="text-xs text-zinc-600">Track performance</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        <button
          onClick={onLogin}
          disabled={isLoading}
          className="w-full bg-white border-2 border-zinc-300 hover:border-zinc-400 text-zinc-700 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <GoogleIcon />
          {isLoading ? 'Signing in...' : 'Continue with Google'}
        </button>

        <p className="text-xs text-zinc-500 text-center">
          By signing in, you agree to our{' '}
          <a href="#" className="text-zinc-900 hover:underline font-medium">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-zinc-900 hover:underline font-medium">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
} 