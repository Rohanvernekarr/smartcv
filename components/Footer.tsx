import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative w-full text-black font-mono">
      
      <div className="absolute top-0 left-0 right-0 h-px bg-zinc-900 to-transparent"></div>
      
      <div className="relative">
        {/* Main footer content */}
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">CV</span>
                  </div>
                  <span className="text-2xl font-bold bg-black bg-clip-text text-transparent">
                    SmartCV
                  </span>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed max-w-md mb-6">
                  Transform your career with AI-powered resume building and analysis. 
                  Create stunning resumes that get noticed by recruiters.
                </p>
                
                
                <div className="flex space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/rohan-vernekar-b57913283/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="LinkedIn"
                    className="group w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://x.com/Rohanvrnkr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Twitter"
                    className="group w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636a10.012 10.012 0 0 0 2.457-2.548z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://github.com/Rohanvernekarr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="GitHub"
                    className="group w-10 h-10 bg-gray-800 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/rohanvrnkr/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram"
                    className="group w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>

             
              <div>
                <h3 className="text-lg font-semibold text-grey-700 mb-6">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/dashboard" className="text-gray-700 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/resume" className="text-gray-700 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                      Create Resume
                    </Link>
                  </li>
                  <li>
                    <Link href="/analyze" className="text-gray-700 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                      Analyze Resume
                    </Link>
                  </li>
                  <li>
                    <Link href="/templates" className="text-gray-700 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                      Templates
                    </Link>
                  </li>
                </ul>
              </div>

              
              <div>
                <h3 className="text-lg font-semibold text-grey-700 mb-6">Support</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-gray-600 text-sm">
                  &copy; {new Date().getFullYear()} SmartCV. All rights reserved.
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <span className="text-gray-600">Made with</span>
                  <span className="text-red-400 animate-pulse">❤️</span>
                  <span className="text-gray-600">for job seekers</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Version 1.0</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}