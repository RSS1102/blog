'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '../components/Motion';

const REPOS = [
  {
    owner: 'Tencent',
    repo: 'cherry-markdown',
    html_url: 'https://github.com/Tencent/cherry-markdown',
    description: '可扩展的 Markdown 渲染引擎 / 解析器（用于将 Markdown 转换为 HTML 的引擎层，支持插件化扩展）。',
  },
  {
    owner: 'Tencent',
    repo: 'tdesign',
    html_url: 'https://github.com/Tencent/tdesign',
    description: '企业级设计系统与组件库（用于构建一致的 UI 体验、包含丰富的可用组件和主题配置）。',
  }
];

interface RepoWithStars extends Record<string, unknown> {
  owner: string;
  repo: string;
  html_url: string;
  description: string;
  stargazers_count: number | null;
}

export default function AboutPage() {
  const [repos, setRepos] = useState<RepoWithStars[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github+json',
      };

      if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
      }

      const results = await Promise.all(
        REPOS.map(async (r) => {
          try {
            const res = await fetch(`https://api.github.com/repos/${r.owner}/${r.repo}`, {
              headers,
              next: { revalidate: 3600 },
            });
            if (!res.ok) return { ...r, stargazers_count: null };
            const payload = await res.json();
            return { ...r, stargazers_count: payload.stargazers_count ?? null };
          } catch {
            return { ...r, stargazers_count: null };
          }
        })
      );

      setRepos(results);
      setLoading(false);
    }

    fetchRepos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <FadeIn>
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src="https://github.com/RSS1102.png"
              alt="RSS1102"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            关于我
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            欢迎！我是一名前端工程师，喜欢把想法做成可复用的工具与组件。
          </p>
        </div>
      </FadeIn>

      <SlideUp delay={0.2}>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </span>
            开源项目
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="card p-5 animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                </div>
              ))
            ) : (
              repos.map((r) => (
                <a
                  key={r.repo}
                  href={r.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="card card-hover p-5 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                      {r.owner}/{r.repo}
                    </h3>
                    {typeof r.stargazers_count === 'number' && (
                      <span className="flex items-center gap-1 text-sm text-amber-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {r.stargazers_count.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {r.description}
                  </p>
                </a>
              ))
            )}
          </div>
        </section>
      </SlideUp>

      <SlideUp delay={0.3}>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </span>
            技术栈
          </h2>
          
          <StaggerContainer>
            <div className="flex flex-wrap gap-3">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Vue', 'Tailwind CSS', 'UnoCSS', 'Framer Motion'].map((tech, i) => (
                <StaggerItem key={tech}>
                  <motion.span
                    className="tag-primary text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </section>
      </SlideUp>

      <SlideUp delay={0.4}>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-pink-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            联系我
          </h2>
          
          <div className="card p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              欢迎通过以下方式与我交流：
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/RSS1102"
                target="_blank"
                rel="noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </section>
      </SlideUp>
    </div>
  );
}
