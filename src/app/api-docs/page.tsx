'use client';

import { useState } from 'react';
import { Code, Play, CheckCircle2, Copy, Check } from 'lucide-react';

interface EndpointDoc {
  method: 'GET' | 'POST';
  path: string;
  description: string;
  sampleBody?: string;
  defaultTestPath?: string;
}

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const endpoints: EndpointDoc[] = [
    {
      method: 'GET',
      path: '/api/products',
      description: 'Fetch all products along with their variants and EMI plans from SQLite database.',
      defaultTestPath: '/api/products',
    },
    {
      method: 'GET',
      path: '/api/products/:slug',
      description: 'Fetch a single product by unique slug (e.g. iphone-17-pro, samsung-s24-ultra, macbook-pro-m3, google-pixel-9-pro).',
      defaultTestPath: '/api/products/iphone-17-pro',
    },
    {
      method: 'POST',
      path: '/api/orders',
      description: 'Create a new EMI order with customer details, selected variant ID, and selected EMI plan ID.',
      sampleBody: JSON.stringify(
        {
          customerName: 'Rahul Sharma',
          customerEmail: 'rahul.sharma@example.com',
          customerPhone: '+91 98765 43210',
          shippingAddress: '402 Sunrise Towers, MG Road, Bengaluru, 560001',
          variantId: 'var-iph17-256',
          emiPlanId: 'emi-iph-12m',
        },
        null,
        2
      ),
      defaultTestPath: '/api/orders',
    },
    {
      method: 'GET',
      path: '/api/orders',
      description: 'Fetch list of all placed orders sorted by creation date descending.',
      defaultTestPath: '/api/orders',
    },
    {
      method: 'GET',
      path: '/api/health',
      description: 'Service health check endpoint returning API version and server status.',
      defaultTestPath: '/api/health',
    },
  ];

  const currentEndpoint = endpoints[activeTab];

  const handleTestRequest = async () => {
    setIsLoading(true);
    setTestResponse(null);

    try {
      let res;
      if (currentEndpoint.method === 'GET') {
        res = await fetch(currentEndpoint.defaultTestPath!);
      } else {
        res = await fetch(currentEndpoint.defaultTestPath!, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: currentEndpoint.sampleBody,
        });
      }
      const data = await res.json();
      setTestResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Request failed';
      setTestResponse(JSON.stringify({ error: errorMessage }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full text-xs font-extrabold text-purple-700 mb-3">
            <Code className="w-3.5 h-3.5" /> REST API Documentation
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Backend API Endpoints</h1>
          <p className="text-sm text-slate-500 mt-1">
            Explore and test live REST API endpoints serving dynamic SQLite product & order data
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Endpoints Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-3">Endpoints</h3>
            {endpoints.map((ep, idx) => (
              <button
                key={ep.path}
                onClick={() => {
                  setActiveTab(idx);
                  setTestResponse(null);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  activeTab === idx
                    ? 'border-purple-600 bg-white shadow-md ring-1 ring-purple-600/20'
                    : 'border-slate-200 bg-white/60 hover:bg-white text-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                        ep.method === 'GET' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-900'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-900">{ep.path}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{ep.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Endpoint Inspector & Live Tester */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-extrabold px-3 py-1 rounded-lg ${
                      currentEndpoint.method === 'GET'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-purple-100 text-purple-900'
                    }`}
                  >
                    {currentEndpoint.method}
                  </span>
                  <span className="font-mono text-lg font-bold text-slate-900">{currentEndpoint.path}</span>
                </div>

                <button
                  onClick={handleTestRequest}
                  disabled={isLoading}
                  className="bg-purple-700 hover:bg-purple-800 disabled:bg-slate-300 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-all flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {isLoading ? 'Sending Request...' : 'Try API Request'}
                </button>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">{currentEndpoint.description}</p>

              {/* Sample Request Body for POST */}
              {currentEndpoint.sampleBody && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Sample Request JSON Body</span>
                    <button
                      onClick={() => handleCopy(currentEndpoint.sampleBody!)}
                      className="text-purple-600 hover:text-purple-800 flex items-center gap-1 font-semibold"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy Payload'}
                    </button>
                  </div>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-2xl text-xs font-mono overflow-x-auto">
                    {currentEndpoint.sampleBody}
                  </pre>
                </div>
              )}

              {/* Live Test Response Output */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Live API Response</span>
                  {testResponse && (
                    <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                      200 OK
                    </span>
                  )}
                </h4>

                {testResponse ? (
                  <pre className="bg-slate-950 text-emerald-400 p-4 rounded-2xl text-xs font-mono overflow-x-auto max-h-96 border border-slate-800">
                    {testResponse}
                  </pre>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-8 text-center text-xs text-slate-400">
                    Click <strong>&quot;Try API Request&quot;</strong> above to execute a live call against the SQLite database.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
