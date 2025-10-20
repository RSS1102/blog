import { promises as fs } from 'fs';
import path from 'path';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '博客文章',
  description: '我的博客文章页面',
  keywords: '博客, Markdown',
};

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

export default async function BlogPage() {
  const postsDir = path.join(process.cwd(), 'src', 'posts');
  const filePath = path.join(postsDir, 'first-post.md');

  let htmlContent = '';
  let postTitle = '博客文章';
  let postDescription = '我的博客文章页面';

  try {
    const markdownContent = await fs.readFile(filePath, 'utf-8');
    const { title, description } = extractMetadata(markdownContent);
    if (title) postTitle = title;
    if (description) postDescription = description;

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
    console.log('Converted HTML Content:', htmlContent);
  } catch (error) {
    console.error('Error reading or converting markdown:', error);
    htmlContent = '<p> 无法加载文章内容。</p>';
  }

  return (
    <>
      <head>
        <title>{postTitle}</title>
        <meta name="description" content={postDescription} />
        <meta name="keywords" content="博客, Markdown, Next.js" />
      </head>
      <section className="list">
        <div className="card glass">
          <h2>{postTitle}</h2>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </section>
    </>
  );
}
