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
  { href: '/about', label: '关于', icon: '✨' },
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl shadow-soft bg-white/80 dark:bg-dark-card/80'
          : 'backdrop-blur-md bg-white/60 dark:bg-dark-card/60'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <nav className="flex-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.span
              className="text-gradient-sakura font-bold text-xl tracking-wide"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              RSS1102
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive(item.href) ? 'nav-link-active' : ''}`}
              >
                <span className="mr-1">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              className="md:hidden w-10 h-10 flex-center rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={mobileMenuOpen ? 'open' : 'closed'}
                className="w-5 h-5 relative"
              >
                <motion.span
                  className="absolute left-0 w-5 h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full"
                  animate={{ y: mobileMenuOpen ? 6 : -6, rotate: mobileMenuOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                />
                <motion.span
                  className="absolute left-0 w-5 h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full"
                  animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                />
                <motion.span
                  className="absolute left-0 w-5 h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden backdrop-blur-xl bg-white/90 dark:bg-dark-card/90"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-primary/15 text-primary-dark dark:text-primary-light'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
