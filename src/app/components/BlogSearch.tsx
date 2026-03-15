'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function BlogSearch({ onSearch, placeholder = '搜索文章...' }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  // Keyboard shortcut: Cmd/Ctrl + K to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setQuery('');
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <motion.div
        className={`relative flex items-center rounded-xl border transition-all duration-200 ${
          focused
            ? 'border-primary ring-2 ring-primary/20'
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
        }`}
        animate={{ scale: focused ? 1.02 : 1 }}
      >
        <div className="pl-4 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="flex-1 px-3 py-3 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
        />
        
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setQuery('')}
              className="pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Keyboard shortcut hint */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex items-center gap-1">
        <kbd className="px-2 py-0.5 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
          ⌘K
        </kbd>
      </div>
    </div>
  );
}
