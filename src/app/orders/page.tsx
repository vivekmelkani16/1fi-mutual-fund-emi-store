'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, Clock, MapPin, Package, RefreshCw, ShoppingBag } from 'lucide-react';

interface OrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  totalAmount: number;
  monthlyEmi: number;
  tenureMonths: number;
  status: string;
  createdAt: string;
  variant: {
    name: string;
    color: string;
    storage: string;
    imageUrl: string;
    product: {
      name: string;
      brand: string;
    };
  };
  emiPlan: {
    interestRate: number;
    cashbackAmount: number;
  };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        setError(data.error || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('Network error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order History</h1>
            <p className="text-sm text-slate-500 mt-1">
              View and track orders created via SQLite database API
            </p>
          </div>
          <button
            onClick={fetchOrders}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-colors w-fit"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Orders List
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {loading && (
          <div className="py-20 text-center">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600 font-medium text-sm">Fetching placed orders from database API...</p>
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-6 rounded-2xl text-center max-w-md mx-auto">
            <p className="font-bold">{error}</p>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm space-y-4">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No Orders Placed Yet</h3>
            <p className="text-sm text-slate-500">
              Pick a product from our catalog and test the complete EMI checkout flow!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors"
            >
              Browse Product Catalog
            </Link>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-4 max-w-4xl mx-auto">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-purple-600" />
                    <span className="font-mono font-bold text-slate-900 text-sm">{order.orderNumber}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Content */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative w-20 h-20 bg-slate-50 rounded-2xl border border-slate-200 shrink-0 p-2">
                    <Image
                      src={order.variant.imageUrl}
                      alt={order.variant.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600">
                      {order.variant.product.brand}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">
                      {order.variant.product.name} ({order.variant.name})
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                      <span>Total Value: <strong>₹{order.totalAmount.toLocaleString('en-IN')}</strong></span>
                      <span>•</span>
                      <span className="text-purple-700 font-bold">
                        EMI: ₹{order.monthlyEmi.toLocaleString('en-IN')}/mo for {order.tenureMonths} Months
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Details Box */}
                <div className="bg-slate-50 rounded-2xl p-3.5 text-xs text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2 border border-slate-100">
                  <div>
                    <span className="text-slate-400 font-medium block">Customer Name:</span>
                    <span className="font-semibold text-slate-900">{order.customerName} ({order.customerPhone})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Email:</span>
                    <span className="font-semibold text-slate-900">{order.customerEmail}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-purple-600" /> Shipping Address:
                    </span>
                    <span className="font-medium text-slate-900">{order.shippingAddress}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
