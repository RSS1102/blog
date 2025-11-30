import PageSection from "../components/PageSection";

const REPOS = [
  {
    owner: 'Tencent',
    repo: 'cherry-markdown',
    html_url: 'https://github.com/Tencent/cherry-markdown',
    description: '可扩展的 Markdown 渲染引擎 / 解析器（用于将 Markdown 转换为 HTML 的引擎层，支持插件化扩展）。',
    stargazers_count: undefined,
  },
  {
    owner: 'Tencent',
    repo: 'tdesign',
    html_url: 'https://github.com/Tencent/tdesign',
    description: '企业级设计系统与组件库（用于构建一致的 UI 体验、包含丰富的可用组件和主题配置）。',
    stargazers_count: undefined,
  }
];

/**
 * AboutPage (server) — fetches each repo's star count from GitHub on the server
 * - Uses an optional process.env.GITHUB_TOKEN to increase rate limits (recommended)
 * - Results are cached via Next.js fetch revalidation (1 hour default below)
 */
export default async function AboutPage() {
  // Prepare headers for GitHub API; if you have a token set GITHUB_TOKEN in env
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  // Fetch repo details in parallel, cache results for 1 hour to avoid hitting rate limits
  const reposWithStars = await Promise.all(
    REPOS.map(async (r) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${r.owner}/${r.repo}`, {
          headers,
          // revalidate: 3600s -> cache for up to 1 hour (server-side)
          next: { revalidate: 3600 },
        });

        if (!res.ok) {
          // If the request failed (rate limit, 404, etc.), return repo unchanged
          return { ...r, stargazers_count: r.stargazers_count ?? null };
        }

        const payload = await res.json();
        return { ...r, stargazers_count: payload.stargazers_count ?? null };
      } catch (err) {
        // On network errors or unexpected exceptions, gracefully fallback
        return { ...r, stargazers_count: r.stargazers_count ?? null };
      }
    })
  );

  return (
    <PageSection title={"关于我"} subtitle={"关于与项目"}>
      <div className="blog-content">
        <p>
          欢迎！我是一名前端工程师，喜欢把想法做成可复用的工具与组件。下面列出了一些我主要参与或维护的开源项目。
        </p>

        <div className="cards-grid" style={{ marginTop: 18 }}>
          {reposWithStars.map((r) => (
            <a key={r.repo} className="blog-card glass" href={r.html_url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <div className="blog-card-row-top">
                <h3 className="blog-card-title">{`${r.owner}/${r.repo}`}</h3>
              </div>

              <div className="blog-card-row blog-card-row-bottom">
                <div className="blog-card-description truncate-3">{r.description}</div>
                <div className="blog-card-meta" aria-hidden={false}>
                  {typeof r.stargazers_count === 'number' ? (
                    <span style={{ fontWeight: 700 }} title={`${r.stargazers_count} stars`}>⭐ {r.stargazers_count.toLocaleString()}</span>
                  ) : (
                    <span style={{ color: 'rgba(0,0,0,0.5)' }}>⭐ —</span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* user requested this paragraph removed */}
      </div>
    </PageSection>
  );
}
