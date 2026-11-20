'use client';

import React, { useState, useEffect } from 'react';
import { Product, StorePrice } from '@/types';
import { formatINR } from '@/lib/utils';
import { CheckCircle2, ExternalLink, ShieldCheck, ShoppingCart, Sparkles, X, Clock, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  selectedStore: StorePrice | null;
}

export function RedirectModal({
  isOpen,
  onClose,
  product,
  selectedStore,
}: RedirectModalProps) {
  const [countdown, setCountdown] = useState(4);
  const [isSimulatedPaid, setIsSimulatedPaid] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCountdown(4);
      setIsSimulatedPaid(false);
      setOrderNumber('CBC-' + Math.floor(100000 + Math.random() * 900000));
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || isSimulatedPaid) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, countdown, isSimulatedPaid]);

  if (!isOpen || !product || !selectedStore) return null;

  const inStockPrices = product.storePrices.filter((s) => s.inStock);
  const highest = inStockPrices.reduce((max, curr) => (curr.price > max.price ? curr : max), selectedStore);
  const savings = highest.price - selectedStore.price;

  const handleSimulatePayment = () => {
    setIsSimulatedPaid(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C59B27', '#E0B33A', '#2C1810', '#1B4332'],
    });
  };

  const handleDirectRedirect = () => {
    // Open the store URL in a new tab
    window.open(selectedStore.productUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border-2 border-vintage-gold bg-vintage-parchment text-vintage-deepMahogany shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-vintage-leather/30 bg-white/80 p-1.5 text-vintage-leather transition hover:bg-vintage-cream"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSimulatedPaid ? (
          <div>
            {/* Victorian Seal Header */}
            <div className="border-b border-vintage-gold/40 bg-vintage-deepMahogany px-6 py-5 text-vintage-parchment">
              <div className="flex items-center space-x-2 text-xs font-semibold text-vintage-amber">
                <ShieldCheck className="h-4 w-4" />
                <span>CobbleCart Deal Verification & Dispatch Protocol</span>
              </div>
              <h2 className="mt-1 font-serif text-xl font-bold text-vintage-parchment">
                Redirecting to {selectedStore.store}
              </h2>
              <p className="text-xs text-vintage-sand/80">
                You have selected the verified lowest price across Indian e-commerce.
              </p>
            </div>

            {/* Product Summary & Price Comparison Box */}
            <div className="p-6">
              <div className="flex items-center space-x-4 rounded-xl border border-vintage-leather/20 bg-vintage-cream/60 p-3.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-16 w-16 rounded-lg object-cover border border-vintage-leather/20"
                />
                <div className="flex-1">
                  <h4 className="line-clamp-1 font-serif text-sm font-bold text-vintage-mahogany">
                    {product.title}
                  </h4>
                  <div className="mt-1 flex items-baseline space-x-2">
                    <span className="font-serif text-lg font-black text-vintage-deepMahogany">
                      {formatINR(selectedStore.price)}
                    </span>
                    {selectedStore.originalPrice > selectedStore.price && (
                      <span className="text-xs text-stone-500 line-through">
                        {formatINR(selectedStore.originalPrice)}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-vintage-leather/70">
                    Fulfilled by: <strong className="text-vintage-leather">{selectedStore.store}</strong> &bull; {selectedStore.deliveryText}
                  </p>
                </div>
              </div>

              {/* Verification Checklist */}
              <div className="mt-4 space-y-2 rounded-xl border border-emerald-700/20 bg-emerald-50/70 p-3.5 text-xs text-emerald-950">
                <div className="flex items-center space-x-2 font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Lowest Retail Price Confirmed on {selectedStore.store}</span>
                </div>
                {savings > 0 && (
                  <div className="flex items-center space-x-2 font-semibold text-emerald-800">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    <span>Instant Arbitrage Savings: {formatINR(savings)} vs competitors</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-emerald-800/80">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Direct checkout link prepared with valid partner discounts</span>
                </div>
              </div>

              {/* Countdown Banner */}
              <div className="mt-5 flex items-center justify-between rounded-lg border border-vintage-gold/40 bg-amber-50 px-4 py-2.5 text-xs">
                <div className="flex items-center space-x-2 text-amber-900 font-medium">
                  <Clock className="h-4 w-4 animate-spin text-vintage-gold" />
                  <span>
                    Opening {selectedStore.store} in <strong>{countdown}</strong> seconds...
                  </span>
                </div>
                <button
                  onClick={handleDirectRedirect}
                  className="font-bold text-vintage-mahogany underline hover:text-amber-900"
                >
                  Redirect Now
                </button>
              </div>

              {/* Dual Action CTAs */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={handleDirectRedirect}
                  className="flex w-full items-center justify-center space-x-2 rounded-xl border border-vintage-gold bg-vintage-gold py-3 text-sm font-bold text-vintage-deepMahogany shadow-brass transition hover:bg-vintage-antiqueGold"
                >
                  <span>Proceed to {selectedStore.store} Official Payment</span>
                  <ExternalLink className="h-4 w-4" />
                </button>

                <button
                  onClick={handleSimulatePayment}
                  className="flex w-full items-center justify-center space-x-2 rounded-xl border border-vintage-leather/30 bg-white py-2.5 text-xs font-semibold text-vintage-leather transition hover:bg-vintage-cream"
                >
                  <Award className="h-4 w-4 text-vintage-gold" />
                  <span>Simulate Instant Order Placement (Portfolio Showcase)</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Simulated Victorian Invoice & Success Receipt */
          <div className="p-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-600 bg-emerald-100 text-emerald-700 shadow-md">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="mt-3">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-800">
                Order Placed & Verified
              </span>
              <h3 className="mt-2 font-serif text-2xl font-black text-vintage-mahogany">
                Victorian Promenade Dispatch Note
              </h3>
              <p className="font-mono text-xs text-stone-500">
                Docket No: {orderNumber}
              </p>
            </div>

            {/* Receipt Parchment Box */}
            <div className="mt-5 rounded-xl border border-vintage-leather/20 bg-vintage-cream/80 p-4 text-left text-xs font-serif leading-relaxed">
              <div className="flex justify-between border-b border-vintage-leather/20 pb-2">
                <span className="text-stone-600">Merchant Channel:</span>
                <span className="font-bold text-vintage-mahogany">{selectedStore.store} (Direct Fulfillment)</span>
              </div>
              <div className="flex justify-between border-b border-vintage-leather/20 py-2">
                <span className="text-stone-600">Product:</span>
                <span className="font-bold text-vintage-mahogany line-clamp-1">{product.title}</span>
              </div>
              <div className="flex justify-between border-b border-vintage-leather/20 py-2">
                <span className="text-stone-600">Amount Tendered:</span>
                <span className="font-bold text-emerald-800 text-sm">{formatINR(selectedStore.price)}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between border-b border-vintage-leather/20 py-2 text-emerald-700">
                  <span>Price Arbitrage Savings:</span>
                  <span className="font-bold">{formatINR(savings)} saved</span>
                </div>
              )}
              <div className="flex justify-between pt-2">
                <span className="text-stone-600">Delivery Est.:</span>
                <span className="font-bold text-vintage-mahogany">{selectedStore.deliveryText}</span>
              </div>
            </div>

            <p className="mt-4 text-xs text-stone-600">
              A copy of this dispatch docket and warranty cert has been dispatched to your registered address.
            </p>

            <button
              onClick={onClose}
              className="mt-6 w-full rounded-xl border border-vintage-gold bg-vintage-deepMahogany py-2.5 text-xs font-bold text-vintage-gold shadow-md transition hover:bg-vintage-mahogany"
            >
              Return to Promenade
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
