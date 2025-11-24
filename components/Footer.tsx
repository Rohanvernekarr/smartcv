import Link from 'next/link';
import { Linkedin, Instagram,Twitter, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full text-black font-mono">
      
      <div className="absolute top-0 left-0 right-0 h-px bg-zinc-900 to-transparent"></div>
      
      <div className="relative">
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              
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
                    className="group w-10 h-10  rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="w-8 h-8 text-gray-900 group-hover:text-black transition-colors" />
                  </a>
                  <a 
                    href="https://x.com/Rohanvrnkr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Twitter"
                    className="group w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Twitter className="w-8 h-8 text-gray-900 group-hover:text-black transition-colors" />
                  </a>
                  <a 
                    href="https://github.com/Rohanvernekarr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="GitHub"
                    className="group w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                   <Github className="w-8 h-8 text-gray-900 group-hover:text-black transition-colors" />
                  </a>
                  <a 
                    href="https://www.instagram.com/rohanvrnkr/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram"
                    className="group w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Instagram className="w-8 h-8 text-gray-900 group-hover:text-black transition-colors" />
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