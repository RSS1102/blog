'use client';

import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  const showEllipsisStart = currentPage > 3;
  const showEllipsisEnd = currentPage < totalPages - 2;

  pages.push(1);

  if (showEllipsisStart) {
    pages.push('...');
  }

  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  if (showEllipsisEnd) {
    pages.push('...');
  }

  if (totalPages > 1 && !pages.includes(totalPages)) {
    pages.push(totalPages);
  }

  return (
    <motion.div
      className="flex justify-center items-center gap-1.5 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Previous */}
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        whileHover={currentPage === 1 ? {} : { scale: 1.05 }}
        whileTap={currentPage === 1 ? {} : { scale: 0.95 }}
        className="w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-300 hover:border-primary/50 hover:text-primary shadow-sm hover:shadow-md"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>

      {/* Pages */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => (
          typeof page === 'number' ? (
            <motion.button
              key={index}
              onClick={() => onPageChange(page)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`min-w-[36px] h-9 px-3 flex items-center justify-center rounded-xl text-sm font-medium transition-all ${
                page === currentPage
                  ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-300 hover:border-primary/50 hover:text-primary shadow-sm hover:shadow-md'
              }`}
            >
              {page}
            </motion.button>
          ) : (
            <span key={index} className="w-7 h-9 flex items-center justify-center text-gray-400 text-xs">
              •••
            </span>
          )
        ))}
      </div>

      {/* Next */}
      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        whileHover={currentPage === totalPages ? {} : { scale: 1.05 }}
        whileTap={currentPage === totalPages ? {} : { scale: 0.95 }}
        className="w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-300 hover:border-primary/50 hover:text-primary shadow-sm hover:shadow-md"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </motion.div>
  );
}
