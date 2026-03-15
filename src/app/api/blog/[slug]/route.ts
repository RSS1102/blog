import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface BlogMeta {
  title: string;
  date: string;
  tags: string[];
  description?: string;
}

function extractMetadata(markdown: string): BlogMeta {
  const lines = markdown.split('\n');
  let title = '';
  let date = '';
  let tags: string[] = [];
  let description = '';

  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.substring(2).trim();
    }
    if (line.startsWith('Date: ') || line.startsWith('date: ')) {
      date = line.substring(line.indexOf(':') + 1).trim();
    }
    if (line.toLowerCase().startsWith('tags:')) {
      const raw = line.substring(line.indexOf(':') + 1).trim();
      tags = raw.split(',').map(t => t.trim()).filter(Boolean);
    }
  }

  // Find first non-empty paragraph as description
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('-') && !trimmed.startsWith('*') && !trimmed.startsWith('Date:') && trimmed.length > 10) {
      description = trimmed;
      break;
    }
  }

  return { title, date, tags, description };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  try {
    const postsDir = path.join(process.cwd(), 'src', 'posts');
    const filePath = path.join(postsDir, `${slug}.md`);
    
    const markdownContent = await fs.readFile(filePath, 'utf-8');
    const meta = extractMetadata(markdownContent);
    
    return NextResponse.json({
      content: markdownContent,
      meta
    });
  } catch {
    return NextResponse.json(
      { error: 'Blog post not found' },
      { status: 404 }
    );
  }
}
