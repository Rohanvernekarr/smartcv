'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { supabase } from '../lib/supabaseClient';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/resume', label: 'Create Resume' },
  { href: '/analyze', label: 'Analyze Resume' },
  { href: '/templates', label: 'Templates' },
  { href: '/settings', label: 'Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth() || {};

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <aside className="h-screen w-64 bg-white/90 backdrop-blur border-r border-gray-200 shadow-lg rounded-r-3xl flex flex-col p-6 sticky top-0 z-20">
      <div className="mb-10 text-3xl font-extrabold tracking-tight text-zinc-700">SmartCV</div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-5 py-3 rounded-xl transition-colors text-base font-medium ${pathname.startsWith(item.href) ? 'bg-blue-100 text-blue-700 shadow' : 'hover:bg-gray-100 text-gray-700'}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      {user && (
        <div className="mt-10 border-t border-gray-100 pt-4">
          <div className="mb-2 text-sm text-gray-500 truncate font-medium">{user.email}</div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg text-sm font-semibold border border-red-100 mt-2"
          >
            Log out
          </button>
        </div>
      )}
    </aside>
  );
} 