import { promises as fs } from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

function extractMetadata(markdown: string) {
  const lines = markdown.split('\n');
  let title = '';
  let description = '';

  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.substring(2).trim();
      break;
    }
  }

  // 查找第一个非空段落作为描述
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('-') && !trimmed.startsWith('*') && trimmed.length > 10) {
      description = trimmed;
      break;
    }
  }

  return { title, description };
}

interface BlogPostProps {
  // Next's generated PageProps expects params to be a Promise-wrapped object
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  // params may be a Promise according to Next's types — awaiting works for both Promise and direct values
  const { slug } = await params;
  const postsDir = path.join(process.cwd(), 'src', 'posts');
  const filePath = path.join(postsDir, `${slug}.md`);

  let htmlContent = '';
  let postTitle = '博客文章';

  try {
    const markdownContent = await fs.readFile(filePath, 'utf-8');
    const { title } = extractMetadata(markdownContent);
    if (title) postTitle = title;

    const { JSDOM } = await import('jsdom');
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
      url: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : 'http://localhost',
    });
    globalThis.window = dom.window as unknown as Window & typeof globalThis;
    globalThis.document = dom.window.document;
    globalThis.navigator = dom.window.navigator;

    const { default: CherryEngine } = await import('cherry-markdown/dist/cherry-markdown.engine.core.esm');
    const engine = new CherryEngine({});
    //@ts-expect-error -- Missing types for 'cherry-markdown' package; runtime API used as-is
    htmlContent = engine.makeHtml(markdownContent);
  } catch (error) {
    console.error('Error reading or converting markdown:', error);
    notFound();
  }

  return (
    <>
      <section className="list">
        <div className="card glass full-width">
          <h2 className='blog-title'>{postTitle}</h2>
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </section>
    </>
  );
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const postsDir = path.join(process.cwd(), 'src', 'posts');
  const filePath = path.join(postsDir, `${slug}.md`);

  try {
    const markdownContent = await fs.readFile(filePath, 'utf-8');
    const { title, description } = extractMetadata(markdownContent);
    return {
      title: title || '博客文章',
      description: description || '我的博客文章页面',
      keywords: '博客, Markdown, Next.js',
    };
  } catch (error) {
    console.error('generateMetadata: failed to read markdown file', error);
    return {
      title: '博客文章',
      description: '我的博客文章页面',
    };
  }
}