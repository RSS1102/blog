'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/Motion';
import Pagination from '../components/Pagination';
import { BlogCardSkeleton } from '../components/Skeleton';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  views: number;
  tags: string[];
}

const MOCK_POSTS: BlogPost[] = [
  {
    slug: 'first-post',
    title: '在本地使用模拟数据展示列表',
    description: '示例文章，演示 tags、日期、浏览量等字段（真实数据来自后端）',
    date: '2025-11-29',
    views: 234,
    tags: ['Next.js', '设计', '前端工程']
  },
  {
    slug: 'second-post',
    title: '第二篇：较多标签示例',
    description: '这篇文章用于演示当标签多于3个时，最后会显示 ...',
    date: '2025-11-20',
    views: 823,
    tags: ['性能', '渲染', 'UI', '可访问性', '优化']
  },
  {
    slug: 'third-post',
    title: '第三篇：少量信息示例',
    description: '简短示例',
    date: '2025-10-02',
    views: 102,
    tags: ['工具']
  },
  {
    slug: 'fourth-post',
    title: '第四篇：React 性能优化',
    description: '深入探讨 React 性能优化技巧，包括 useMemo、useCallback 等',
    date: '2025-09-15',
    views: 456,
    tags: ['React', '性能', '优化']
  },
  {
    slug: 'fifth-post',
    title: '第五篇：TypeScript 进阶',
    description: 'TypeScript 高级类型、条件类型、映射类型等',
    date: '2025-08-28',
    views: 789,
    tags: ['TypeScript', '前端']
  },
  {
    slug: 'sixth-post',
    title: '第六篇：CSS 布局技巧',
    description: '现代 CSS 布局，包括 Flexbox 和 Grid',
    date: '2025-08-10',
    views: 321,
    tags: ['CSS', '布局']
  },
  {
    slug: 'seventh-post',
    title: '第七篇：Node.js 最佳实践',
    description: 'Node.js 开发中的最佳实践和常见问题',
    date: '2025-07-22',
    views: 567,
    tags: ['Node.js', '后端']
  },
  {
    slug: 'eighth-post',
    title: '第八篇：微前端架构',
    description: '微前端架构设计与实现方案',
    date: '2025-07-05',
    views: 890,
    tags: ['架构', '微前端']
  }
];

const ITEMS_PER_PAGE = 4;

// 计算阅读时间（假设每分钟阅读 200 个中文字符）
function calculateReadingTime(text: string): number {
  const charsPerMinute = 200;
  const charCount = text.length;
  return Math.max(1, Math.ceil(charCount / charsPerMinute));
}

export default function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false); // 模拟加载状态

  const totalPages = Math.ceil(MOCK_POSTS.length / ITEMS_PER_PAGE);

  const paginatedPosts = MOCK_POSTS.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <FadeIn>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            博客
          </h1>
          <p className="text-gray-500 dark:text-gray-300">
            技术、工程、性能与实践
          </p>
        </div>
      </FadeIn>

      {/* Posts List */}
      <StaggerContainer delay={0.1}>
        <div className="grid gap-4">
          {loading ? (
            // 显示骨架屏
            Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))
          ) : (
            paginatedPosts.map((post, index) => (
              <StaggerItem key={post.slug}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <article className="card card-hover p-6 group">
                      {/* Meta Info - Top */}
                      <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 dark:text-gray-400">
                        <time>{post.date}</time>
                        <span>·</span>
                        <span>📖 {calculateReadingTime(post.description)} 分钟</span>
                        <span>·</span>
                        <span>👁 {post.views} 次</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h2>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                        {post.description}
                      </p>

                      {/* Tags & Arrow */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="tag-primary text-xs">
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="tag text-xs bg-gray-200 dark:bg-gray-700">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Arrow */}
                        <motion.div
                          className="text-gray-300 group-hover:text-primary transition-colors"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </div>
                    </article>
                  </Link>
              </motion.div>
            </StaggerItem>
          ))
          )}
        </div>
      </StaggerContainer>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
