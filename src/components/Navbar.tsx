'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, FileText, CheckCircle2, TrendingUp } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-purple-700 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:bg-purple-800 transition-colors">
            ↑Fi
          </div>
          <div>
            <span className="font-bold text-xl text-slate-900 tracking-tight block leading-none">
              1Fi <span className="text-purple-700 font-extrabold">Store</span>
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-purple-600 flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> MF-Backed EMI
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              isActive('/')
                ? 'bg-purple-50 text-purple-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Catalog
          </Link>

          <Link
            href="/orders"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              isActive('/orders')
                ? 'bg-purple-50 text-purple-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            My Orders
          </Link>

          <Link
            href="/api-docs"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              isActive('/api-docs')
                ? 'bg-purple-50 text-purple-700 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            API Docs
          </Link>
        </nav>
      </div>
    </header>
  );
}
