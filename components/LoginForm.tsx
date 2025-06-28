import React from 'react';

interface LoginFormProps {
  error: string;
  isLoading: boolean;
  onLogin: () => void;
}

export default function LoginForm({ error, isLoading, onLogin }: LoginFormProps) {
  // Google Icon Component
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
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Google Sign In Button */}
        <button
          onClick={onLogin}
          disabled={isLoading}
          className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <GoogleIcon />
          {isLoading ? 'Signing in...' : 'Continue with Google'}
        </button>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center">
          By signing in, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
} 