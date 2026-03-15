'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FadeIn, SlideUp } from '../../components/Motion';
import TableOfContents from '../../components/TableOfContents';

interface BlogMeta {
  title: string;
  date: string;
  tags: string[];
}

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug as string;
  const [content, setContent] = useState('');
  const [meta, setMeta] = useState<BlogMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch(`/api/blog/${slug}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setContent(data.content || '');
        setMeta(data.meta || null);
      } catch {
        setContent('# 文章未找到\n\n抱歉，您访问的文章不存在。');
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // Simple markdown rendering (you can replace with cherry-markdown)
  const renderContent = (md: string) => {
    // Add IDs to headings for TOC
    let processed = md.replace(/^(#{1,3})\s+(.+)$/gm, (_, hashes, text) => {
      const id = text.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `${hashes} <span id="${id}">${text}</span>`;
    });

    // Basic markdown to HTML
    processed = processed
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mt-8 mb-4">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold mt-10 mb-4">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-10 mb-4">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto my-4"><code class="text-sm font-mono">$2</code></pre>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
      .replace(/^\- (.+)$/gm, '<li class="ml-4">$1</li>')
      .replace(/\n\n/g, '</p><p class="my-4">')
      .replace(/^(.+)$/gm, (match) => {
        if (match.startsWith('<')) return match;
        return `<p class="my-4">${match}</p>`;
      });

    return { __html: processed };
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <article className="flex-1 min-w-0">
          <FadeIn>
            {/* Back link */}
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回博客列表
            </Link>
          </FadeIn>

          <SlideUp>
            {/* Header */}
            <header className="mb-8">
              {meta?.title && (
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {meta.title}
                </h1>
              )}
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {meta?.date && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(meta.date).toLocaleDateString('zh-CN')}
                  </span>
                )}
                
                {meta?.tags && meta.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {meta.tags.map((tag) => (
                      <span key={tag} className="tag-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>
          </SlideUp>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={renderContent(content)}
          />
        </article>

        {/* Sidebar - Table of Contents */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <TableOfContents content={content} />
        </aside>
      </div>
    </div>
  );
}
