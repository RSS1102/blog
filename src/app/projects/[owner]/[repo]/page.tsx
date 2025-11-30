import { Metadata } from 'next';
import PageSection from '../../../components/PageSection';
import { notFound } from 'next/navigation';

type RepoInfo = {
  full_name?: string;
  description?: string | null;
  stargazers_count?: number;
  html_url?: string;
};

async function fetchRepo(owner: string, repo: string): Promise<RepoInfo | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function fetchReadme(owner: string, repo: string) {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.content) {
      // content is base64
      const buff = Buffer.from(json.content, 'base64');
      return buff.toString('utf-8');
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ owner: string; repo: string }> }): Promise<Metadata> {
  const { owner, repo } = await params;
  const info = await fetchRepo(owner, repo);
  return {
    title: info?.full_name || `${owner}/${repo}`,
    description: info?.description || `Project ${owner}/${repo}`,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ owner: string; repo: string }> }) {
  const { owner, repo } = await params;
  const info = await fetchRepo(owner, repo);
  if (!info) return notFound();

  const readme = await fetchReadme(owner, repo);

  return (
    <PageSection title={info.full_name || `${owner}/${repo}`} subtitle={info.description ?? undefined}>
      <div style={{ marginTop: 8 }} className="blog-content">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: '1rem' }}>⭐ {info.stargazers_count ?? '—'}</div>
          <a href={info.html_url} target="_blank" rel="noreferrer">查看仓库 · GitHub</a>
        </div>

        {readme ? (
          <div style={{ marginTop: 18 }}>
            <pre style={{ whiteSpace: 'pre-wrap', background: 'rgba(0,0,0,0.02)', padding: 12, borderRadius: 8 }}>{readme}</pre>
          </div>
        ) : (
          <p style={{ marginTop: 18, color: 'rgba(0,0,0,0.6)' }}>当前仓库 README 未能获取或为空。</p>
        )}
      </div>
    </PageSection>
  );
}
