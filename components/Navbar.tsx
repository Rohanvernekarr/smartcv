'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { supabase } from '../lib/supabaseClient';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/resume', label: 'Create Resume' },
  { href: '/analyze', label: 'Analyze' },
  { href: '/templates', label: 'Templates' },
  { href: '/settings', label: 'Settings' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth() || {};

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-30 w-full bg-white/95 border-b border-gray-200 shadow-sm flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="text-2xl font-extrabold text-blue-700 tracking-tight">SmartCV</Link>
        <div className="hidden md:flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${pathname.startsWith(item.href) ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="hidden md:inline text-gray-500 text-sm font-medium truncate max-w-[120px]">{user.email}</span>
            <button onClick={handleLogout} className="button-secondary text-sm px-4 py-1">Log out</button>
          </>
        )}
      </div>
    </nav>
  );
}
