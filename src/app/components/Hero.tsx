"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [languages, setLanguages] = useState<string[]>([]);
  const [loadingLangs, setLoadingLangs] = useState(true);
  interface PRItem {
    id: number;
    title: string;
    html_url?: string;
    updated_at?: string;
  }
  const [prs, setPrs] = useState<PRItem[]>([]);
  const [loadingPrs, setLoadingPrs] = useState(true);
  const [prsTotal, setPrsTotal] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadLanguages() {
      try {
        const res = await fetch("https://api.github.com/users/RSS1102/repos?per_page=100");
        if (!res.ok) return;
        const repos = await res.json();
        const counts: Record<string, number> = {};
        for (const r of repos) {
          const lang = r.language;
          if (lang) counts[lang] = (counts[lang] || 0) + 1;
        }
        const top = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([lang]) => lang);
        if (mounted) setLanguages(top);
      } catch {
        // ignore
      } finally {
        if (mounted) setLoadingLangs(false);
      }
    }

    loadLanguages();
    async function loadPRs() {
      try {
        // 使用 Search API 查找用户创建的 PR（跨仓库）
        const r = await fetch(
          "https://api.github.com/search/issues?q=type:pr+author:RSS1102&per_page=3&sort=updated&order=desc"
        );
        if (!r.ok) return;
        const json = await r.json();
        if (mounted) {
          setPrs(json.items || []);
          // search API returns total_count to indicate more results
          setPrsTotal(typeof json.total_count === "number" ? json.total_count : null);
        }
      } catch {
        // ignore
      } finally {
        if (mounted) setLoadingPrs(false);
      }
    }

    loadPRs();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="hero hero-large">
      <div className="hero-bg" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="sparkles" />
      </div>

      <div className="card hero-card glass">
        <div className="sweep" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-left">
            <div className="avatar-shell">
              <a href="https://github.com/RSS1102" target="_blank" rel="noreferrer" aria-label="Open RSS1102 on GitHub">
                <img src="https://github.com/RSS1102.png" alt="RSS1102 头像" className="avatar" />
              </a>
            </div>

            <div className="hero-lines">
              <h1 className="hero-title">RSS1102
                <span className="title-underline" aria-hidden="true" />
              </h1>
              <p className="hero-sub">Keep Loving Coding</p>

              <div className="hero-ctas">
                <Link href="/blogs" className="btn primary">近期文章</Link>
                <Link href="/life" className="btn outline">生活</Link>
                <Link href="/about" className="btn outline">关于</Link>
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: "0.9rem", marginBottom: 8, color: "rgba(0,0,0,0.6)" }}>常用语言</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {loadingLangs && <div style={{ color: "rgba(0,0,0,0.45)" }}>加载中…</div>}
                  {!loadingLangs && languages.length === 0 && (
                    <div style={{ color: "rgba(0,0,0,0.45)" }}>暂无数据</div>
                  )}
                  {languages.map((l) => (
                    <span key={l} className="blog-tag">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="neon-bars" aria-hidden="true" />
            <div className="glass-panel">
              <div style={{ marginTop: 6 }}>
                <div style={{ fontSize: "0.9rem", marginBottom: 8, color: "rgba(0,0,0,0.6)" }}>最近的 PR</div>
                {loadingPrs && <div style={{ color: "rgba(0,0,0,0.45)" }}>加载中…</div>}
                {!loadingPrs && prs.length === 0 && (
                  <div style={{ color: "rgba(0,0,0,0.45)" }}>暂无 PR</div>
                )}
                <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                  {prs.map((p) => {
                    // 从 html_url 提取仓库名（格式: https://github.com/owner/repo/pull/num）
                    const urlParts = p.html_url ? p.html_url.split("/") : [];
                    const repoName = urlParts.length >= 5 ? `${urlParts[3]}/${urlParts[4]}` : "repo";
                    return (
                      <li key={p.id} className="pr-item" style={{ marginBottom: 8 }}>
                        <a href={p.html_url} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#0070f3", display: "block" }}>
                          <span className="pr-title">{p.title}</span>
                        </a>
                        <div className="pr-tooltip" role="tooltip">{p.title}</div>
                        <div style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.55)" }}>{repoName} · {p.updated_at ? new Date(p.updated_at).toLocaleDateString() : ''}</div>
                      </li>
                    );
                  })}
                  {/* 如果 GitHub 上 PR 的总数多于当前显示数量，显示一行省略号提示有更多 */}
                  {prsTotal && prsTotal > prs.length && (
                    <li style={{ marginTop: 6, display: "flex", alignItems: "center", color: "rgba(0,0,0,0.45)" }}>… 更多</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
