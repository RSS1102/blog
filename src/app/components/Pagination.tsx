"use client";
import Link from 'next/link';
import React from 'react';

type Props = {
  basePath?: string; // e.g. '/blogs'
  page: number;
  totalPages: number;
};

export default function Pagination({ basePath = '/blogs', page, totalPages }: Props) {
  // Always render pagination UI so the user sees a consistent control even when there's 1 page.

  const pages = [] as number[];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  const q = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`);

  return (
    <nav className="pagination" aria-label="Pagination">
      <div className="pagination-inner">
        {page > 1 ? (
          <Link href={q(page - 1)} className="btn outline" aria-label="上一页">上一页</Link>
        ) : (
          <span className="btn outline" aria-disabled="true" aria-label="上一页" tabIndex={-1}>上一页</span>
        )}

        <div className="pagination-pages" aria-hidden>
          {pages.map((p) => (
            // 页码不应触发事件或跳转 —— 仅展示页码指示
            <span key={p} className={`btn ${p === page ? 'primary' : 'outline'} page-num`} aria-current={p === page ? 'page' : undefined}>
              {p}
            </span>
          ))}
        </div>

        {page < totalPages ? (
          <Link href={q(page + 1)} className="btn outline" aria-label="下一页">下一页</Link>
        ) : (
          <span className="btn outline" aria-disabled="true" aria-label="下一页" tabIndex={-1}>下一页</span>
        )}
      </div>
    </nav>
  );
}
