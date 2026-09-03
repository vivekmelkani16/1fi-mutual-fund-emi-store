import Link from 'next/link';
import { Shield, Sparkles, Zap, RefreshCw } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center text-white font-extrabold text-lg">
                ↑Fi
              </div>
              <span className="font-bold text-xl text-white">1Fi EMI Store</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Buy your favorite gadgets on low-cost & no-cost EMI plans backed by mutual fund investments. Earn cashbacks while keeping your capital working for you.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-purple-950/60 border border-purple-800/60 px-3 py-1.5 rounded-full text-xs text-purple-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              1Fi SDE1 Assignment Full-Stack Production Build
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-purple-400 transition-colors">
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link href="/products/iphone-17-pro" className="hover:text-purple-400 transition-colors">
                  iPhone 17 Pro
                </Link>
              </li>
              <li>
                <Link href="/products/samsung-s24-ultra" className="hover:text-purple-400 transition-colors">
                  Samsung S24 Ultra
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-purple-400 transition-colors">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="hover:text-purple-400 transition-colors">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Why 1Fi?</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400 shrink-0" />
                Mutual Fund Backed
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                0% Interest EMI Options
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-purple-400 shrink-0" />
                Dynamic Database API
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} 1Fi Technologies. Built for 1Fi SDE1 Assignment.</p>
          <p className="flex items-center gap-4">
            <span className="text-slate-400">REST API Driven</span> • <span className="text-slate-400">Prisma + SQLite</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
