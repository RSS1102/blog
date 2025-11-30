import PageSection from "../components/PageSection";
import Link from 'next/link';
import { RECORD_MODULES } from '../../data/records';

export default function RecordsPage() {
  return (
    <PageSection title={"记录"} subtitle={"零碎记录 / 快速想法 / 特别笔记"}>
      <div style={{ marginTop: 8 }}>
        <p>这里是“记录”页面，适合放置一些短小的、临时的或特殊的笔记——例如：待办想法、未成体系的观察、临时日志或很短的记录条目。</p>

        <div style={{ marginTop: 16 }} className="cards-grid">
          {RECORD_MODULES.map((m) => (
            <article key={m.slug} className="blog-card glass">
              <div className="blog-card-row-top">
                <h3 className="blog-card-title"><Link href={`/records/${m.slug}`}>{m.title}</Link></h3>
              </div>
              <p className="blog-card-description">{m.description}</p>
            </article>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
