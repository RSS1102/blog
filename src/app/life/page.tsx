'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/Motion';
import Pagination from '../components/Pagination';

const LIFE_POSTS = [
  { slug: '2025-life-trip', title: '2025 — 一次短途旅行的记录', description: '沿着海岸线，记录一些看到的风景与零星感想 — 摄影、咖啡与清晨的散步。', date: '2025-11-01', category: '旅行' },
  { slug: 'reading-notes-2025', title: '读书笔记：短篇散文合集', description: '把一些书里的短句摘录并记下当时的心情与个人理解。', date: '2025-08-12', category: '读书' },
  { slug: 'minimal-kitchen-ideas', title: '小厨房 · 极简改造', description: '乱中有序：分享在有限空间中优化收纳与烹饪效率的心得。', date: '2025-05-21', category: '居家' },
  { slug: 'coffee-time', title: '咖啡时光 · 日常仪式感', description: '清晨一杯咖啡，傍晚一本书，简单的幸福不过如此。', date: '2025-04-10', category: '日常' },
  { slug: 'photo-collection-2025', title: '2025 摄影集：光影故事', description: '用镜头记录生活中的瞬间，光与影的交织。', date: '2025-03-28', category: '摄影' },
  { slug: 'weekend-hiking', title: '周末徒步：山野呼吸', description: '远离城市喧嚣，在山间寻找内心的平静。', date: '2025-02-15', category: '户外' }
];

const ITEMS_PER_PAGE = 4;

const categoryEmoji: Record<string, string> = {
  '旅行': '🌍', '读书': '📚', '居家': '🏠', '日常': '☕', '摄影': '📷', '户外': '⛰️'
};

export default function LifePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(LIFE_POSTS.length / ITEMS_PER_PAGE);
  const paginatedPosts = LIFE_POSTS.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <FadeIn>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">生活</h1>
          <p className="text-gray-500 dark:text-gray-400">日常记录 · 读书 · 旅行 · 点滴分享</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-lg mx-auto">欢迎来到「生活」页面。这里会放一些和技术以外的日常记录、读书笔记、旅行感想或生活片段。</p>
      </FadeIn>

      <StaggerContainer delay={0.1}>
        <div className="grid gap-6">
          {paginatedPosts.map((post, index) => (
            <StaggerItem key={post.slug}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Link href={`/blog/${post.slug}`}>
                  <article className="card card-hover p-6 group">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <span className="tag-primary self-start">{categoryEmoji[post.category] || '📌'} {post.category}</span>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{post.title}</h2>
                          <time className="text-sm text-gray-500 whitespace-nowrap">{post.date}</time>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{post.description}</p>
                      </div>
                      <motion.div className="hidden md:block text-gray-300" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </motion.div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}
