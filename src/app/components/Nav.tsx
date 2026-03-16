'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { href: '/', label: '主页', icon: '🏠' },
  { href: '/blogs', label: '博客', icon: '📝' },
  { href: '/life', label: '生活', icon: '🌈' },
  { href: '/about', label: '关于', icon: '👤' },
];

export default function Nav() {
  const pathname = usePathname() || '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    if (path === '/blogs') return pathname.startsWith('/blog');
    return pathname.startsWith(path);
  };

  return (
    <header 
      className={`sticky top-0 z-50 glass-card !rounded-none border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-200 ${
        scrolled ? 'backdrop-blur-xl shadow-lg' : 'backdrop-blur-md'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <nav className="flex-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-gradient font-bold text-lg tracking-wide">
              RSS1102
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all ${isActive(item.href) ? 'text-primary bg-primary/10 dark:bg-primary/20' : ''}`}
              >
                <span className="text-sm mr-1">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button
              className="md:hidden w-9 h-9 flex-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={mobileMenuOpen ? 'open' : 'closed'}
                className="w-5 h-5 relative"
              >
                <motion.span
                  className="absolute left-0 w-5 h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full"
                  animate={{ y: mobileMenuOpen ? 6 : -6, rotate: mobileMenuOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                />
                <motion.span
                  className="absolute left-0 w-5 h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full"
                  animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                />
                <motion.span
                  className="absolute left-0 w-5 h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full"
                  animate={{ y: mobileMenuOpen ? -6 : 6, rotate: mobileMenuOpen ? -45 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                />
              </motion.div>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-100 dark:border-gray-800/50 overflow-hidden backdrop-blur-md"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
