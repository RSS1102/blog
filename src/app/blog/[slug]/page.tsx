'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FadeIn, SlideUp } from '../../components/Motion';
import TableOfContents from '../../components/TableOfContents';
import ReadingProgress from '../../components/ReadingProgress';

interface BlogMeta { title: string; date: string; tags: string[]; }

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

  return (
    <>
      <ReadingProgress />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="flex-1 min-w-0">
            <FadeIn>
              <Link href="/blogs" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-dark-card hover:bg-primary/10 transition-all duration-200 group mb-6 text-sm text-gray-600 dark:text-gray-400 hover:text-primary shadow-soft">
                <motion.svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" whileHover={{ x: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </motion.svg>
                返回博客
              </Link>
            </FadeIn>

            <SlideUp>
              <header className="mb-10">
                {meta?.title && (
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-5">{meta.title}</h1>
                )}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  {meta?.date && (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {new Date(meta.date).toLocaleDateString('zh-CN')}
                    </span>
                  )}
                  {meta?.tags && meta.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {meta.tags.map((tag) => (<span key={tag} className="tag-primary">{tag}</span>))}
                    </div>
                  )}
                </div>
              </header>
            </SlideUp>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </motion.div>
          </article>

          <aside className="w-full lg:w-64 flex-shrink-0">
            <TableOfContents content={content} />
          </aside>
        </div>
      </div>
    </>
  );
}
