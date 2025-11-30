"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname() || "/";

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    if (path === "/blog") return pathname.startsWith("/blog") || pathname.startsWith("/blogs");
    return pathname.startsWith(path);
  };

  return (
    <header className="nav glass">
      <div className="nav-inner">
        <div className="logo"><Link href="/">RSS1102</Link></div>
        <nav className="menu" aria-label="主导航">
          <Link href="/" aria-current={isActive("/") ? "page" : undefined} data-active={isActive("/") ? "true" : undefined}>
            主页
          </Link>
          <Link href="/blogs" aria-current={isActive("/blog") ? "page" : undefined} data-active={isActive("/blog") ? "true" : undefined}>
            博客
          </Link>
          <Link href="/life" aria-current={isActive("/life") ? "page" : undefined} data-active={isActive("/life") ? "true" : undefined}>
            生活
          </Link>
          <Link href="/records" aria-current={isActive("/records") ? "page" : undefined} data-active={isActive("/records") ? "true" : undefined}>
            记录
          </Link>
          <Link href="/about" aria-current={isActive("/about") ? "page" : undefined} data-active={isActive("/about") ? "true" : undefined}>
            关于
          </Link>
        </nav>
      </div>
    </header>
  );
}
