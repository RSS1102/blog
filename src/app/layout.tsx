import type { Metadata } from 'next';
import '@unocss/reset/tailwind.css';
import './globals.css';
import Nav from './components/Nav';
import Providers from './components/Providers';

export const metadata: Metadata = {
  title: 'RSS1102 - Blog & Portfolio',
  description: 'RSS1102 的技术博客 — 前端工程、性能与工程化心得的分享。',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'RSS1102 - Blog & Portfolio',
    description: 'RSS1102 的技术博客 — 前端工程、性能与工程化心得的分享。',
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
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Nav />
            <main className="flex-1">
              {children}
            </main>
            <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-100 dark:border-gray-800">
              © {new Date().getFullYear()} RSS1102. All rights reserved.
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
