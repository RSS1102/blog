'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from './Motion';

interface PRItem {
  id: number;
  title: string;
  html_url?: string;
  updated_at?: string;
}

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
}

const MOCK_POSTS: BlogPost[] = [
  {
    slug: 'first-post',
    title: '在本地使用模拟数据展示列表',
    description: '示例文章，演示 tags、日期、浏览量等字段',
    date: '2025-11-29',
    tags: ['Next.js', '设计', '前端工程']
  },
  {
    slug: 'second-post',
    title: '第二篇：较多标签示例',
    description: '这篇文章用于演示当标签多于3个时',
    date: '2025-11-20',
    tags: ['性能', '渲染', 'UI']
  },
  {
    slug: 'third-post',
    title: '第三篇：少量信息示例',
    description: '简短示例',
    date: '2025-10-02',
    tags: ['工具']
  }
];

export default function Hero() {
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [loadingLangs, setLoadingLangs] = useState(true);
  const [prs, setPrs] = useState<PRItem[]>([]);
  const [loadingPrs, setLoadingPrs] = useState(true);
  const [blogs] = useState<BlogPost[]>(MOCK_POSTS);

  useEffect(() => {
    let mounted = true;

    async function loadLanguages() {
      try {
        // 获取最新的 100 个仓库，按更新时间排序
        const res = await fetch('https://api.github.com/users/RSS1102/repos?per_page=100&sort=updated');
        if (!res.ok) return;

        const repos = await res.json();

        // 统计每种语言的使用次数
        const counts: Record<string, number> = {};
        let totalRepos = 0;

        for (const r of repos) {
          const lang = r.language;
          if (lang) {
            counts[lang] = (counts[lang] || 0) + 1;
            totalRepos++;
          }
        }

        // 计算百分比并排序，取前 6 个
        const topLanguages = Object.entries(counts)
          .map(([name, count]) => ({
            name,
            count,
            percentage: Math.round((count / totalRepos) * 100)
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6);

        if (mounted) {
          setLanguages(topLanguages);
          setLoadingLangs(false);
        }
      } catch {
        if (mounted) setLoadingLangs(false);
      }
    }

    async function loadPRs() {
      try {
        const r = await fetch(
          'https://api.github.com/search/issues?q=type:pr+author:RSS1102&per_page=5&sort=updated&order=desc'
        );
        if (!r.ok) return;
        const json = await r.json();
        if (mounted) {
          setPrs(json.items || []);
          setLoadingPrs(false);
        }
      } catch {
        if (mounted) setLoadingPrs(false);
      }
    }

    loadLanguages();
    loadPRs();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="min-h-[calc(100vh-4rem)] flex-center relative overflow-hidden">
      {/* Background Effects - 温馨二次元风格 */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* 主背景渐变 - 温暖的桃粉色 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(255,228,225,0.4) 0%, rgba(255,240,245,0.2) 30%, transparent 70%)'
          }}
        />

        {/* 樱花粉渐变球 - 左上 */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(255,182,193,0.5) 0%, rgba(255,182,193,0.2) 40%, transparent 70%)',
            left: '-15%',
            top: '-10%'
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* 蜜桃橙渐变球 - 右上 */}
        <motion.div
          className="absolute w-[380px] h-[380px] rounded-full blur-[90px]"
          style={{
            background: 'radial-gradient(circle, rgba(255,218,185,0.5) 0%, rgba(255,160,122,0.2) 50%, transparent 70%)',
            right: '-12%',
            top: '10%'
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />

        {/* 薰衣草紫渐变球 - 左下 */}
        <motion.div
          className="absolute w-[320px] h-[320px] rounded-full blur-[70px]"
          style={{
            background: 'radial-gradient(circle, rgba(230,190,255,0.4) 0%, rgba(186,144,255,0.15) 50%, transparent 70%)',
            left: '10%',
            bottom: '-8%'
          }}
          animate={{
            x: [0, 25, 0],
            y: [0, -35, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5
          }}
        />

        {/* 天蓝色渐变球 - 右下 */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full blur-[80px]"
          style={{
            background: 'radial-gradient(circle, rgba(173,216,230,0.4) 0%, rgba(135,206,235,0.15) 50%, transparent 70%)',
            right: '15%',
            bottom: '15%'
          }}
          animate={{
            x: [0, -35, 0],
            y: [0, 25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 8
          }}
        />

        {/* 星星装饰 - 随机分布的小星星 */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              left: `${15 + (i * 7) % 70}%`,
              top: `${10 + (i * 13) % 80}%`,
              boxShadow: '0 0 8px 2px rgba(255,182,193,0.6)'
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5
            }}
          />
        ))}

        {/* 网格图案 - 更柔和 */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.01]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <StaggerContainer delay={0.1}>
          {/* Avatar & Info */}
          <StaggerItem>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
              {/* Avatar */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-primary/20">
                  <img
                    src="https://github.com/RSS1102.png"
                    alt="RSS1102"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute -inset-2 rounded-2xl"
                  animate={{
                    boxShadow: ['0 0 0 0 rgba(143,124,255,0)', '0 0 0 8px rgba(143,124,255,0.1)', '0 0 0 0 rgba(143,124,255,0)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Text Info */}
              <div className="text-center md:text-left">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-gradient">RSS1102</span>
                </motion.h1>
                <motion.p
                  className="text-lg my-5 p-4 text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Keep Loving Coding
                </motion.p>
                
                {/* Tags */}
                <motion.div
                  className="flex flex-wrap justify-center md:justify-start gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">常用语言:</span>
                  {loadingLangs ? (
                    <span className="text-sm text-gray-400">加载中...</span>
                  ) : languages.length > 0 ? (
                    languages.map((lang) => (
                      <motion.span
                        key={lang.name}
                        className="tag-primary cursor-help"
                        title={`${lang.count} 个仓库 (${lang.percentage}%)`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        {lang.name}
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">暂无数据</span>
                  )}
                </motion.div>
              </div>
            </div>
          </StaggerItem>

          {/* PR & Blogs Cards */}
          <StaggerItem>
            <FadeIn delay={0.6}>
              <div className="grid md:grid-cols-2 gap-4">
                {/* PR Card - Left */}
                <motion.div
                  className="gradient-border-card"
                  whileHover={{ y: -2, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="section-title">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        最近的 PR
                      </h3>
                      <a
                        href="https://github.com/pulls?q=is%3Aopen+is%3Apr+author%3ARSS1102"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary hover:text-primary-dark hover:underline transition-colors"
                      >
                        查看全部
                      </a>
                    </div>
                    
                    {loadingPrs ? (
                      <div className="py-4 text-center text-gray-400">加载中...</div>
                    ) : prs.length > 0 ? (
                      <ul className="space-y-2">
                        {prs.slice(0, 4).map((pr) => {
                          const urlParts = pr.html_url ? pr.html_url.split('/') : [];
                          const repoName = urlParts.length >= 5 ? `${urlParts[3]}/${urlParts[4]}` : 'repo';
                          return (
                            <li key={pr.id}>
                              <a
                                href={pr.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="pr-item block group"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-1 group-hover:text-primary transition-colors">
                                    {pr.title}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {repoName} · {pr.updated_at ? new Date(pr.updated_at).toLocaleDateString('zh-CN') : ''}
                                </div>
                              </a>
                            </li>
                          );
                        })}
                        {prs.length > 4 && (
                          <li>
                            <a
                              href="https://github.com/pulls?q=is%3Aopen+is%3Apr+author%3ARSS1102"
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-primary hover:text-primary-dark hover:underline transition-colors"
                            >
                              ...
                            </a>
                          </li>
                        )}
                      </ul>
                    ) : (
                      <div className="py-4 text-center text-gray-400">暂无 PR</div>
                    )}
                  </div>
                </motion.div>

                {/* Blogs Card - Right */}
                <motion.div
                  className="gradient-border-card"
                  whileHover={{ y: -2, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="section-title">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        最近的博客
                      </h3>
                      <Link
                        href="/blogs"
                        className="text-xs text-primary hover:text-primary-dark hover:underline transition-colors"
                      >
                        查看全部
                      </Link>
                    </div>
                    
                    <ul className="space-y-3">
                      {blogs.slice(0, 4).map((blog) => (
                        <li key={blog.slug}>
                          <Link
                            href={`/blog/${blog.slug}`}
                            className="pr-item block group"
                          >
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-1 block group-hover:text-primary transition-colors">
                              {blog.title}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {blog.date}
                              </span>
                              <div className="flex gap-1">
                                {blog.tags.slice(0, 2).map((tag) => (
                                  <span key={tag} className="text-xs tag">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                      {blogs.length > 4 && (
                        <li>
                          <Link href="/blogs" className="text-xs text-primary hover:text-primary-dark hover:underline transition-colors">
                            ...
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
