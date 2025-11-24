'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '../lib/supabaseClient';
import { LayoutDashboard, FileText, Search, Layout } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/resume', label: 'Create Resume', icon: FileText },
  { href: '/analyze', label: 'Analyze', icon: Search },
  { href: '/templates', label: 'Templates', icon: Layout },
  // { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useAuth() || {};
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      console.log('Sign out result:', error);
      // Force clear all Supabase auth keys from localStorage
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('sb-')) localStorage.removeItem(key);
      });
      if (setUser) setUser(null);
      setIsMobileMenuOpen(false);
      router.push('/login');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        console.error('Error signing in with Google:', error);
      }
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Error with Google login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Google Icon 
  const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  return (
    <>
      <nav className={`sticky top-0 z-50 w-full transition-all font-mono duration-300 ${
        isScrolled 
          ? 'bg-white backdrop-blur-lg border-b border-zinc-200 shadow-md' 
          : 'bg-white border-b border-zinc-200'
      }`}>
        <div className="max-w-7xl mx-auto p-1 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
           
            <Link 
              href="/" 
              className="flex items-center space-x-2 group"
              onClick={closeMobileMenu}
            >
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-bold text-sm transform group-hover:scale-105 transition-transform duration-200">
                CV
              </div>
              <span className="text-3xl font-bold text-zinc-900">
                SmartCV
              </span>
            </Link>

            {/* Desktop */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center  space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 relative group ${
                      isActive
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-md">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* User Menu & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                 
                  <div className="hidden lg:flex items-center space-x-3">
                    <div className="flex items-center space-x-2 px-3 py-1.5 bg-zinc-100 rounded-full border border-zinc-200">
                      <div className="w-6 h-6 bg-zinc-900 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {user.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-zinc-700 font-medium max-w-[120px] truncate">
                        {user.email}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="px-4 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg border border-zinc-200 transition-colors duration-200 disabled:opacity-50"
                    >
                      {isLoading ? 'Signing out...' : 'Sign out'}
                    </button>
                  </div>

                  {/* Mobile User  */}
                  <div className="lg:hidden">
                    <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-300">
                      <span className="text-white text-sm font-medium">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Desktop Google Login */}
                  <div className="hidden lg:block">
                    <button
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-4 py-2 bg-white border border-zinc-300 rounded-lg font-medium text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin"></div>
                      ) : (
                        <GoogleIcon />
                      )}
                      <span className="text-sm">
                        {isLoading ? 'Signing in...' : 'Sign in with Google'}
                      </span>
                    </button>
                  </div>

                  {/* Mobile Google Login */}
                  <div className="lg:hidden">
                    <button
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                      className="p-2 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 hover:border-zinc-400 transition-all duration-200 disabled:opacity-50"
                      aria-label="Sign in with Google"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin"></div>
                      ) : (
                        <GoogleIcon />
                      )}
                    </button>
                  </div>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div className={`h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
                  }`}></div>
                  <div className={`h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}></div>
                  <div className={`h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
                  }`}></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-4 py-4 bg-white/95 backdrop-blur-sm border-t border-zinc-200">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-zinc-900 text-white border border-zinc-900'
                        : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </Link>
                );
              })}
              
              <div className="border-t border-zinc-200 my-4"></div>
              
              {user ? (
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-300">
                      <span className="text-white text-sm font-medium">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-zinc-700 font-medium">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors duration-200 font-medium disabled:opacity-50"
                  >
                    {isLoading ? 'Signing out...' : 'Sign out'}
                  </button>
                </div>
              ) : (
                <div className="px-4 py-2">
                  <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white border border-zinc-300 rounded-xl font-medium text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400 transition-all duration-200 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin"></div>
                    ) : (
                      <GoogleIcon />
                    )}
                    <span>
                      {isLoading ? 'Signing in...' : 'Sign in with Google'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}