'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Shield,
  TrendingUp,
  Zap,
  ShoppingBag,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
} from 'lucide-react';

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

interface PlacedOrder {
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
    product: {
      name: string;
    };
  };
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState<EmiPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.data);
          const defaultVar = data.data.variants.find((v: ProductVariant) => v.isDefault) || data.data.variants[0];
          setSelectedVariant(defaultVar);
          const popularEmi = data.data.emiPlans.find((e: EmiPlan) => e.isPopular) || data.data.emiPlans[0];
          setSelectedEmiPlan(popularEmi);
        } else {
          setError(data.error || 'Product not found');
        }
      } catch {
        setError('Failed to fetch product from API database');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium text-sm">Loading dynamic product details from SQLite API...</p>
        </div>
      </div>
    );
  }

  if (error || !product || !selectedVariant) {
    return (
      <div className="min-h-screen max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
          <p className="text-slate-600 text-sm mb-6">{error || 'The requested product could not be found.'}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVariant || !selectedEmiPlan) return;

    setIsSubmittingOrder(true);
    setOrderError(null);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress,
          variantId: selectedVariant.id,
          emiPlanId: selectedEmiPlan.id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPlacedOrder(data.data);
      } else {
        setOrderError(data.error || 'Failed to place order');
      }
    } catch {
      setOrderError('Network error while placing order. Please try again.');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            {product.brand} • {product.badge || 'PRO MODEL'}
          </span>
        </div>
      </div>

      {/* Main Container matching PDF reference design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Product Visuals & Variant Selector */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card Container for Product Image */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm relative overflow-hidden flex flex-col items-center">
              {product.badge && (
                <span className="absolute top-6 left-6 bg-purple-900 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow uppercase">
                  {product.badge}
                </span>
              )}

              {/* Product Header inside Card */}
              <div className="w-full text-left mb-6">
                <h1 className="text-3xl font-black text-slate-900 leading-tight">{product.name}</h1>
                <p className="text-sm font-semibold text-slate-500 mt-0.5">{selectedVariant.storage} • {selectedVariant.color}</p>
              </div>

              {/* Dynamic Image */}
              <div className="relative w-full h-80 my-4">
                <Image
                  src={selectedVariant.imageUrl}
                  alt={selectedVariant.name}
                  fill
                  className="object-contain transition-all duration-500"
                  priority
                />
              </div>

              {/* Finishes Swatch Dots matching PDF 'Available in 3 finishes' */}
              <div className="mt-4 pt-4 border-t border-slate-100 w-full text-center">
                <p className="text-xs font-medium text-slate-500 mb-3">
                  Available in {product.variants.length} finishes
                </p>
                <div className="flex items-center justify-center gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`w-7 h-7 rounded-full transition-all flex items-center justify-center p-0.5 ${
                        selectedVariant.id === variant.id
                          ? 'ring-2 ring-purple-600 ring-offset-2 scale-110'
                          : 'hover:scale-105 border border-slate-300'
                      }`}
                      title={`${variant.color} - ${variant.storage}`}
                    >
                      <span
                        className="w-full h-full rounded-full shadow-inner block"
                        style={{ backgroundColor: variant.colorHex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Storage / Option Selector Pills */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
                <span>Select Storage Variant</span>
                <span className="text-xs text-slate-400 font-normal">Dynamic Price Sync</span>
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant.id === variant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/80 text-purple-900 ring-1 ring-purple-600'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-extrabold block">{variant.storage}</span>
                      <span className="text-[11px] text-slate-500 block truncate">{variant.color}</span>
                      <span className="text-xs font-bold text-slate-900 mt-1 block">
                        ₹{variant.price.toLocaleString('en-IN')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mutual Fund Guarantee Banner */}
            <div className="bg-gradient-to-br from-purple-900 to-slate-900 text-white rounded-3xl p-6 shadow-md border border-purple-800 space-y-3">
              <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span>1Fi Mutual Fund Backed Guarantee</span>
              </div>
              <p className="text-xs text-purple-100 leading-relaxed">
                Instead of blocking your credit card limit or liquidating investments, your existing mutual fund units act as collateral. Your investments stay active and continue growing while you pay easy monthly EMIs!
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-purple-200 border-t border-purple-800/80">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Compounding Growth
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant Dispersal
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Reference Design EMI Plans Card List */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              {/* Header Price Section matching reference image */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">
                    ₹{selectedVariant.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-base text-slate-400 line-through">
                    ₹{selectedVariant.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                    {Math.round(((selectedVariant.mrp - selectedVariant.price) / selectedVariant.mrp) * 100)}% OFF
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-600 pt-1">
                  EMI plans backed by mutual funds
                </p>
              </div>

              {/* Selectable EMI Plans List matching PDF styling */}
              <div className="space-y-3">
                {product.emiPlans.map((plan) => {
                  const isSelected = selectedEmiPlan?.id === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedEmiPlan(plan)}
                      className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between gap-4 relative ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/50 shadow-md ring-2 ring-purple-600/20'
                          : 'border-slate-100 bg-slate-50/60 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      {/* Popular tag */}
                      {plan.isPopular && (
                        <span className="absolute -top-2.5 right-6 bg-purple-700 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow">
                          Most Popular
                        </span>
                      )}

                      {/* EMI Details Left */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-lg sm:text-xl font-black text-slate-900">
                            ₹{plan.monthlyAmount.toLocaleString('en-IN')} x {plan.tenureMonths} months
                          </span>
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${
                              plan.interestRate === 0
                                ? 'bg-purple-100 text-purple-900 border-purple-200 font-extrabold'
                                : 'bg-slate-200 text-slate-700 border-slate-300'
                            }`}
                          >
                            {plan.interestRate === 0 ? '0% interest' : `${plan.interestRate}% interest`}
                          </span>
                        </div>

                        {/* Cashback Tag matching PDF reference design */}
                        {plan.cashbackAmount > 0 && (
                          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                            <span>Additional cashback of ₹{plan.cashbackAmount.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                      </div>

                      {/* Radio button selection state */}
                      <div className="shrink-0">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isSelected ? 'border-purple-700 bg-purple-700 text-white' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Plan Summary Callout */}
              {selectedEmiPlan && (
                <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5 text-slate-700">
                  <div className="flex justify-between font-semibold">
                    <span>Selected Plan Tenure:</span>
                    <span className="font-bold text-slate-900">{selectedEmiPlan.tenureMonths} Months</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Monthly Installment:</span>
                    <span className="font-bold text-purple-700">₹{selectedEmiPlan.monthlyAmount.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Cashback Bonus:</span>
                    <span className="font-bold text-emerald-600">₹{selectedEmiPlan.cashbackAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}

              {/* Action Button: Proceed with selected plan */}
              <button
                onClick={() => setIsCheckoutOpen(true)}
                disabled={!selectedEmiPlan}
                className="w-full bg-purple-700 hover:bg-purple-800 disabled:bg-slate-300 text-white font-extrabold text-base py-4 px-6 rounded-2xl shadow-lg hover:shadow-purple-700/30 transition-all flex items-center justify-center gap-2 group"
              >
                <ShoppingBag className="w-5 h-5" />
                Proceed with Selected Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Drawer / Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Complete Your EMI Order</h3>
                <p className="text-xs text-slate-500 mt-0.5">1Fi Mutual Fund Backed Checkout</p>
              </div>
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setPlacedOrder(null);
                  setOrderError(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* If order placed successfully */}
            {placedOrder ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-900">Order Confirmed!</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Order Number: <span className="font-mono font-bold text-purple-700">{placedOrder.orderNumber}</span>
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2 text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Item:</span>
                    <span className="font-bold">{placedOrder.variant.product.name} ({placedOrder.variant.name})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Monthly EMI:</span>
                    <span className="font-bold text-purple-700">₹{placedOrder.monthlyEmi.toLocaleString('en-IN')} x {placedOrder.tenureMonths}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Customer Name:</span>
                    <span className="font-medium">{placedOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Shipping Address:</span>
                    <span className="font-medium">{placedOrder.shippingAddress}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    href="/orders"
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-colors text-center"
                  >
                    View Order Details in Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setPlacedOrder(null);
                    }}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors"
                  >
                    Close Modal
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Form */
              <form onSubmit={handleCheckoutSubmit} className="mt-6 space-y-4">
                {/* Order Summary Box */}
                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-xs space-y-1.5 text-purple-950">
                  <div className="flex justify-between font-bold text-sm">
                    <span>{product.name}</span>
                    <span>₹{selectedVariant.price.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-purple-700 font-medium">Variant: {selectedVariant.name}</p>
                  <p className="text-purple-900 font-bold">
                    Plan: ₹{selectedEmiPlan?.monthlyAmount.toLocaleString('en-IN')}/mo for {selectedEmiPlan?.tenureMonths} months ({selectedEmiPlan?.interestRate}% interest)
                  </p>
                </div>

                {orderError && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-semibold">
                    {orderError}
                  </div>
                )}

                {/* Form Fields: Name, Email, Phone, Shipping Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-purple-600" /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-purple-600" /> Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-purple-600" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-600" /> Shipping Address
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Flat / Building, Street, City, Pincode"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingOrder}
                  className="w-full bg-purple-700 hover:bg-purple-800 disabled:bg-slate-300 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmittingOrder ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Order in Database...
                    </>
                  ) : (
                    'Confirm & Place EMI Order'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
