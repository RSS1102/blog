"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname() || "/";

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="nav glass">
      <div className="nav-inner">
        <div className="logo">My Blog</div>
        <nav className="menu" aria-label="主导航">
          <Link href="/" aria-current={isActive("/") ? "page" : undefined} data-active={isActive("/") ? "true" : undefined}>
            主页
          </Link>
          <Link href="/blog" aria-current={isActive("/blog") ? "page" : undefined} data-active={isActive("/blog") ? "true" : undefined}>
            博客
          </Link>
          <Link href="/about" aria-current={isActive("/about") ? "page" : undefined} data-active={isActive("/about") ? "true" : undefined}>
            关于
          </Link>
        </nav>
      </div>
    </header>
  );
}
