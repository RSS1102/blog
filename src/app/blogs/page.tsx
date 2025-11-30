import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import Pagination from '../components/Pagination';
import PageSection from '../components/PageSection';
import { Metadata } from 'next';

function extractMetadata(markdown: string) {
  const lines = markdown.split('\n');
  let title = '';
  let description = '';
  let date = '';
  let tags: string[] = [];

  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.substring(2).trim();
      break;
    }
  }

  // 遍历所有行，提取 Date 和 Tags（不提前 break，避免顺序问题）
  for (const line of lines) {
    if (line.startsWith('Date: ') || line.startsWith('date: ')) {
      date = line.substring(line.indexOf(':') + 1).trim();
    }
    if (line.toLowerCase().startsWith('tags:')) {
      // 支持: Tags: tag1, tag2
      const raw = line.substring(line.indexOf(':') + 1).trim();
      tags = raw.split(',').map(t => t.trim()).filter(Boolean);
    }
  }

  // 查找第一个非空段落作为描述
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('-') && !trimmed.startsWith('*') && !trimmed.startsWith('Date:') && trimmed.length > 10) {
      description = trimmed;
      break;
    }
  }

  return { title, description, date, tags };
}

export default async function BlogsPage({ searchParams }: { searchParams?: Promise<ParsedUrlQuery | undefined> }) {
  // 本地模拟数据开关：设置为 true 时使用下面的 mock 数据（便于 UI 预览 / 后端未接入时使用）
  const USE_MOCK = true;

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
    }
  ];
  const postsDir = path.join(process.cwd(), 'src', 'posts');
  const files = await fs.readdir(postsDir);
  const mdFiles = files.filter(file => file.endsWith('.md'));

  let posts: BlogPost[] = [];
  if (USE_MOCK) {
    // 使用模拟数据（先展示 mock）
    posts = MOCK_POSTS;
  } else {
    posts = await Promise.all(mdFiles.map(async (file) => {
    const filePath = path.join(postsDir, file);
    const markdownContent = await fs.readFile(filePath, 'utf-8');
    const { title, description, date, tags } = extractMetadata(markdownContent);
    const slug = file.replace('.md', '');
    return {
      slug,
      title: title || slug,
      description: description || '无描述',
      date: date || '2023-10-01', // 默认日期
      views: Math.floor(Math.random() * 1000) + 100, // 模拟浏览人数
      tags: tags || [],
    };
    }));
  }

  // 支持 ?page=1 查询参数（服务端分页 / 切片）
  const pageSize = 5;
  // searchParams may be a Promise according to Next generated types — await it to handle both cases
  const _searchParams = await (searchParams as Promise<ParsedUrlQuery | undefined> | ParsedUrlQuery | undefined);
  const pageNumber = parseInt((((_searchParams && (_searchParams.page as string)) || '1') as string), 10) || 1;
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const start = (pageNumber - 1) * pageSize;
  const pagePosts = posts.slice(start, start + pageSize);

  return (
    <PageSection title="博客" subtitle="技术、工程、性能与实践" variant="blog">
      <div className="blogs-container">
        <div className="blogs-grid">
          {pagePosts.map((post) => (
            <article key={post.slug} className="blog-card glass">
              {/* 两行布局：第一行 — 左侧标题 / 右侧最后更新；第二行 — 左侧 tags / 右侧 浏览人数 */}
              <div className="blog-card-row blog-card-row-top">
                <h2 className="blog-card-title">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <time className="blog-card-date" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('zh-CN')}
                </time>
              </div>

              <div className="blog-card-row blog-card-row-bottom">
                <div className="blog-card-tags" aria-label={`Tags: ${post.tags?.join(', ')}`}>
                  {post.tags && post.tags.length > 0 ? (
                    post.tags.slice(0, 3).map((t: string, idx: number) => (
                      <span key={`${t}-${idx}`} className="blog-tag">{t}</span>
                    ))
                  ) : (
                    <span className="blog-tag empty">无标签</span>
                  )}
                  {post.tags && post.tags.length > 3 && (
                    <span className="blog-tag more" title={post.tags.slice(3).join(', ')} aria-hidden={false}>...</span>
                  )}
                </div>

                <div className="blog-card-views">浏览 {post.views} 次</div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <Pagination basePath="/blogs" page={pageNumber} totalPages={totalPages} />
        </div>
      </div>
    </PageSection>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '博客列表',
    description: '我的博客文章列表',
    keywords: '博客, Markdown, Next.js',
  };
}