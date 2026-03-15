'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content?: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!content) return;

    // Extract headings from markdown content
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      items.push({ id, text, level });
    }

    setHeadings(items);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    // Observe all heading elements
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [content]);

  if (headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden lg:block sticky top-24"
    >
      <div className="card p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3">
          目录
        </h4>
        <nav>
          <ul className="space-y-1">
            {headings.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`block text-sm py-1.5 px-3 rounded transition-colors ${
                    activeId === item.id
                      ? 'text-primary bg-primary/10 font-medium'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.div>
  );
}
