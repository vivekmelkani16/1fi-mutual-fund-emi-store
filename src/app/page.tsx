'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp, Zap, ChevronRight, CheckCircle } from 'lucide-react';

interface ProductVariant {
  id: string;
  name: string;
  color: string;
  colorHex: string;
  storage: string;
  finish?: string;
  mrp: number;
  price: number;
  imageUrl: string;
  isDefault: boolean;
}

interface EmiPlan {
  id: string;
  monthlyAmount: number;
  tenureMonths: number;
  interestRate: number;
  cashbackAmount: number;
  isPopular: boolean;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  badge?: string;
  variants: ProductVariant[];
  emiPlans: EmiPlan[];
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        } else {
          setError(data.error || 'Failed to load products');
        }
      } catch (err) {
        setError('Network error fetching products API');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = selectedBrand === 'All'
    ? products
    : products.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());

  const brands = ['All', 'Apple', 'Samsung', 'Google'];

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Banner Section */}
      <section className="bg-gradient-to-br from-purple-950 via-purple-900 to-slate-900 text-white relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-purple-800/60 border border-purple-600/50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-purple-200 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-purple-300" />
            1Fi SDE1 Assignment - Dynamic Database Driven EMI Store
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Smartphones & Laptops on <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-100 to-emerald-300">MF-Backed EMI</span>
              </h1>
              <p className="text-lg text-purple-100/90 max-w-2xl leading-relaxed">
                Unlock 0% interest monthly installment plans backed by your mutual fund investments. Enjoy flexible tenures up to 60 months with instant cashbacks up to ₹10,000.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm text-purple-200">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-md">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Returns grow while on EMI</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-md">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>0% Interest Plans</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl backdrop-blur-md">
                  <ShieldCheck className="w-4 h-4 text-purple-300" />
                  <span>Dynamic API Powered</span>
                </div>
              </div>
            </div>

            {/* Quick Feature Card */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white/10 border border-white/15 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
                <div className="flex items-center justify-between text-xs text-purple-200 font-semibold uppercase tracking-wider">
                  <span>Reference Offer</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30">Verified</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-purple-800/80 flex items-center justify-center text-3xl font-extrabold shadow-inner text-white">
                    ↑Fi
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">iPhone 17 Pro 256GB</h3>
                    <p className="text-xs text-purple-200">Starting from ₹2,842/mo • 0% Interest Available</p>
                  </div>
                </div>

                <div className="bg-purple-950/60 p-3 rounded-2xl border border-purple-800/60 text-xs flex justify-between items-center text-purple-200">
                  <span>Max Cashback Eligible:</span>
                  <span className="font-bold text-emerald-400 text-sm">₹7,500 Instant Credit</span>
                </div>

                <Link
                  href="/products/iphone-17-pro"
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-purple-600/30 text-sm"
                >
                  View iPhone 17 Pro EMI Plans <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Header & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Available Products</h2>
            <p className="text-sm text-slate-500 mt-1">
              Select a gadget to explore custom mutual-fund-backed EMI monthly breakdown
            </p>
          </div>

          {/* Brand Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  selectedBrand === brand
                    ? 'bg-purple-700 text-white shadow-md shadow-purple-700/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600 font-medium">Fetching dynamic catalog from database API...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center max-w-lg mx-auto my-12">
            <p className="text-rose-700 font-semibold mb-2">Error Loading Catalog</p>
            <p className="text-slate-600 text-sm">{error}</p>
          </div>
        )}

        {/* Product Cards Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const defaultVariant = product.variants.find((v) => v.isDefault) || product.variants[0];
              const lowestEmi = product.emiPlans.reduce(
                (min, p) => (p.monthlyAmount < min.monthlyAmount ? p : min),
                product.emiPlans[0]
              );
              const maxCashback = Math.max(...product.emiPlans.map((p) => p.cashbackAmount));

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  {/* Image Container with Badge */}
                  <div className="relative h-64 bg-slate-100 p-6 flex items-center justify-center overflow-hidden">
                    {product.badge && (
                      <span className="absolute top-4 left-4 z-10 bg-purple-900 text-white text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full shadow-md uppercase">
                        {product.badge}
                      </span>
                    )}

                    <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={defaultVariant?.imageUrl || ''}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>

                    {/* Available Finishes Pill */}
                    <div className="absolute bottom-3 left-4 right-4 bg-white/90 backdrop-blur-md py-1.5 px-3 rounded-full text-center text-xs font-semibold text-slate-700 border border-slate-200 flex items-center justify-center gap-2">
                      <span>Available in {product.variants.length} finishes</span>
                      <div className="flex items-center gap-1">
                        {product.variants.slice(0, 3).map((v) => (
                          <span
                            key={v.id}
                            className="w-2.5 h-2.5 rounded-full border border-slate-300 inline-block"
                            style={{ backgroundColor: v.colorHex }}
                            title={v.color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Details Container */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-600 block mb-1">
                        {product.brand}
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Pricing Section */}
                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">
                          ₹{defaultVariant.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm text-slate-400 line-through">
                          ₹{defaultVariant.mrp.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md ml-auto">
                          SAVE ₹{(defaultVariant.mrp - defaultVariant.price).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* EMI Highlight */}
                      <div className="mt-3 bg-purple-50/80 rounded-2xl p-3 border border-purple-100 space-y-1">
                        <div className="flex items-center justify-between text-xs text-purple-900 font-bold">
                          <span>Starting EMI:</span>
                          <span className="text-purple-700 font-extrabold text-sm">
                            ₹{lowestEmi?.monthlyAmount.toLocaleString('en-IN')}/mo
                          </span>
                        </div>
                        <p className="text-[11px] text-purple-700/80 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-purple-600" /> Backed by Mutual Funds
                        </p>

                        {maxCashback > 0 && (
                          <div className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-1 rounded-lg mt-1 text-center">
                            Additional Cashback ₹{maxCashback.toLocaleString('en-IN')}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Link */}
                    <div className="mt-6">
                      <Link
                        href={`/products/${product.slug}`}
                        className="w-full bg-slate-900 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm shadow-sm group-hover:shadow-md"
                      >
                        View EMI Plans <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
