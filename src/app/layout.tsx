import type { Metadata } from "next";
import Nav from "./components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Blog",
  description: "A simple glass-style blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  

  return (
    <html lang="zh-CN">
      <body>
        <div className="page-bg">
          <Nav />

          <main className="container">{children}</main>

          <footer className="footer">© {new Date().getFullYear()} My Blog</footer>
        </div>
      </body>
    </html>
  );
}
