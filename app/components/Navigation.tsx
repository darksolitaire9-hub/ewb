'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, HelpCircle, Github } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/why', label: 'Why This App?', icon: HelpCircle },
    { href: '/research', label: 'Research', icon: BookOpen },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <nav className="bg-white shadow-md mb-6" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-bold text-primary-700 group-hover:text-primary-800 transition-colors">
              MoodBoard Pro
            </div>
            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
              Built with Bob
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
            
            {/* GitHub Link */}
            <a
              href="https://github.com/moodboardpro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="View on GitHub (opens in new tab)"
            >
              <Github size={18} aria-hidden="true" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Made with Bob