'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn } from './Motion';

interface FeaturedPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  views: number;
  tags: string[];
  featured: boolean;
}

// 模拟精选文章数据
const FEATURED_POSTS: FeaturedPost[] = [
  {
    slug: 'first-post',
    title: '在本地使用模拟数据展示列表',
    description: '示例文章，演示 tags、日期、浏览量等字段（真实数据来自后端）',
    date: '2025-11-29',
    views: 234,
    tags: ['Next.js', '设计', '前端工程'],
    featured: true
  },
  {
    slug: 'fourth-post',
    title: '第四篇：React 性能优化',
    description: '深入探讨 React 性能优化技巧，包括 useMemo、useCallback 等',
    date: '2025-09-15',
    views: 456,
    tags: ['React', '性能', '优化'],
    featured: true
  },
  {
    slug: 'fifth-post',
    title: '第五篇：TypeScript 进阶',
    description: 'TypeScript 高级类型、条件类型、映射类型等',
    date: '2025-08-28',
    views: 789,
    tags: ['TypeScript', '前端'],
    featured: true
  }
];

export default function FeaturedPosts() {
  const [posts, setPosts] = useState<FeaturedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟加载
    setTimeout(() => {
      setPosts(FEATURED_POSTS);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-8" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            ✨ 精选文章
          </h2>
          <Link
            href="/blogs"
            className="text-sm text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
          >
            查看全部
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <article className="card card-hover p-6 h-full group">
                  {/* Meta Info */}
                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-500 dark:text-gray-400">
                    <time>{post.date}</time>
                    <span>·</span>
                    <span>👁 {post.views}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="tag-primary text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
