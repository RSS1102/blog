import type { Metadata } from "next";
import Nav from "./components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "RSS1102 - Blog & Portfolio",
  description: "RSS1102 的技术博客 — 前端工程、性能与工程化心得的分享。",
  openGraph: {
    title: "RSS1102 - Blog & Portfolio",
    description: "RSS1102 的技术博客 — 前端工程、性能与工程化心得的分享。",
    images: [
      {
        url: '/avatar.svg',
        width: 1200,
        height: 630,
        alt: 'RSS1102 头像',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RSS1102 - Blog & Portfolio',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  

  return (
    <html lang="zh-CN">
      <body>
        <div className="page-bg">
          <Nav />

          <main>
            <div className="notebook-bg">
              <div className="notebook-margin" aria-hidden="true" />
              <div className="notebook-holes" aria-hidden="true" />
              <div className="notebook-content">{children}</div>
            </div>
          </main>

          <footer className="footer">© {new Date().getFullYear()} My Blog</footer>
        </div>
      </body>
    </html>
  );
}
