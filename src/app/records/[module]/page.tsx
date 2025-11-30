import { notFound } from 'next/navigation';
import PageSection from '../../../components/PageSection';
import { RECORD_MODULES } from '../../../data/records';

export default function ModulePage({ params }: { params: { module: string } }) {
  const moduleSlug = params.module;
  const module = RECORD_MODULES.find(m => m.slug === moduleSlug);

  if (!module) {
    // If the module doesn't exist, show 404
    notFound();
  }

  return (
    <PageSection title={module.title} subtitle={module.description}>
      <div style={{ marginTop: 8 }}>
        <p>该模块目前暂无具体条目 — 你可以稍后在对应模块下添加记录条目，或者我可以帮你初始化示例条目。</p>
        <div style={{ marginTop: 18 }}>
          <p><strong>建议：</strong>未来可在此模块目录中放置多个短文章或按时间倒序列出内容。</p>
        </div>
      </div>
    </PageSection>
  );
}
