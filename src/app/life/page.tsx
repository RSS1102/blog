import Link from "next/link";

import PageSection from "../components/PageSection";

export default function LifePage() {
  return (
    <PageSection title={"生活"} subtitle={"日常记录 · 读书 · 旅行 · 点滴分享"} variant="life">
      <div className="blog-content" style={{ marginTop: 6 }}>
        <p>
          欢迎来到「生活」页面。这里会放一些和技术以外的日常记录、读书笔记、旅行感想或生活片段。
        </p>

        <div className="blogs-grid" style={{ marginTop: 18 }}>
          <article className="blog-card">
            <div className="blog-card-row-top">
              <h3 className="blog-card-title"><Link href="/blogs/2025-life-trip">2025 — 一次短途旅行的记录</Link></h3>
            </div>
            <div className="blog-card-description">沿着海岸线，记录一些看到的风景与零星感想 — 摄影、咖啡与清晨的散步。</div>
            <div className="blog-card-meta">2025-11-01 · 生活</div>
          </article>

          <article className="blog-card">
            <div className="blog-card-row-top">
              <h3 className="blog-card-title"><Link href="/blogs/reading-notes-2025">读书笔记：短篇散文合集</Link></h3>
            </div>
            <div className="blog-card-description">把一些书里的短句摘录并记下当时的心情与个人理解。</div>
            <div className="blog-card-meta">2025-08-12 · 生活</div>
          </article>

          <article className="blog-card">
            <div className="blog-card-row-top">
              <h3 className="blog-card-title"><Link href="/blogs/minimal-kitchen-ideas">小厨房 · 极简改造</Link></h3>
            </div>
            <div className="blog-card-description">乱中有序：分享在有限空间中优化收纳与烹饪效率的心得。</div>
            <div className="blog-card-meta">2025-05-21 · 生活</div>
          </article>

        </div>

        <p style={{ marginTop: 20 }}>
          想把具体文章都列出来？我可以把这里连接到已有博客文章（基于 tag=life）或创建独立的文章目录页面。
        </p>
      </div>
    </PageSection>
  );
}
