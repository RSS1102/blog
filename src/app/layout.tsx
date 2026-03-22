import type { Metadata } from 'next';
import './globals.css';
import Providers from './components/Providers';
import Nav from './components/Nav';

export const metadata: Metadata = {
  title: 'RSS1102 Blog',
  description: 'Keep Loving Coding',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
        <Providers>
          {/* 背景装饰层 */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
            {/* 顶部柔和光晕 */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full blur-[120px] opacity-40"
              style={{
                background: 'radial-gradient(circle, rgba(255, 158, 181, 0.3) 0%, rgba(232, 213, 242, 0.2) 50%, transparent 70%)'
              }}
            />
            {/* 右下角光晕 */}
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] rounded-full blur-[100px] opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(168, 216, 234, 0.4) 0%, rgba(168, 216, 234, 0.2) 50%, transparent 70%)'
              }}
            />
            {/* 左下角暖光 */}
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[300px] rounded-full blur-[80px] opacity-25"
              style={{
                background: 'radial-gradient(circle, rgba(255, 228, 196, 0.5) 0%, rgba(255, 218, 185, 0.2) 50%, transparent 70%)'
              }}
            />
          </div>

          <Nav />

          <main className="relative z-10">
            {children}
          </main>

          <footer className="relative z-10 py-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800/50">
            <div className="flex items-center justify-center gap-2">
              <span className="text-gradient-sakura font-medium">RSS1102</span>
              <span>·</span>
              <span>Keep Loving Coding</span>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
