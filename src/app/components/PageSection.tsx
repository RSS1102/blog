import React from 'react';

type Props = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  variant?: 'blog' | 'life' | 'default';
};

export default function PageSection({ title, subtitle, children, variant = 'default' }: Props) {
  const variantClass = variant === 'life' ? 'section-life' : variant === 'blog' ? 'section-blog' : '';

  return (
    <section className={`page-section card full-width glass ${variantClass}`} aria-labelledby="page-title">
      <div style={{ padding: '18px 22px' }}>
        <h2 id="page-title" className="blog-title" style={{ marginBottom: 6 }}>{title}</h2>
        {subtitle && <div style={{ color: 'rgba(0,0,0,0.65)', marginBottom: 12 }}>{subtitle}</div>}
      </div>

      <div className="page-section-body" style={{ padding: '0 18px 28px' }}>
        {children}
      </div>
    </section>
  );
}
