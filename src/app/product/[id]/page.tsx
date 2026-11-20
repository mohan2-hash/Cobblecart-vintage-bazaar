'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductById } from '@/lib/products-data';
import { Header } from '@/components/Header';
import { PriceComparisonCard } from '@/components/PriceComparisonCard';
import { ReviewSentimentAnalyzer } from '@/components/ReviewSentimentAnalyzer';
import { RedirectModal } from '@/components/RedirectModal';
import { AIConciergeDrawer } from '@/components/AIConciergeDrawer';
import { AuthModal } from '@/components/AuthModal';
import { PRODUCTS } from '@/lib/products-data';
import { formatINR } from '@/lib/utils';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Truck,
  Sparkles,
  ExternalLink,
  History,
  CheckCircle2,
  Bookmark,
} from 'lucide-react';
import { StorePrice, Product } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const product = getProductById(id as string);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isRedirectOpen, setIsRedirectOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StorePrice | null>(null);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isGaslight, setIsGaslight] = useState(true);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h2 className="font-serif text-2xl font-bold text-vintage-mahogany">
          Ware Not Found in the Promenade Archives
        </h2>
        <Link
          href="/"
          className="mt-4 rounded-xl border border-vintage-gold bg-vintage-gold px-4 py-2 text-xs font-bold text-vintage-deepMahogany shadow-sm"
        >
          Return to Victorian Street
        </Link>
      </div>
    );
  }

  const cheapest = product.storePrices.reduce(
    (min, curr) => (curr.price < min.price ? curr : min),
    product.storePrices[0]
  );
  const highest = product.storePrices.reduce(
    (max, curr) => (curr.price > max.price ? curr : max),
    product.storePrices[0]
  );
  const savings = highest.price - cheapest.price;

  const handleBuy = (prod: Product, store: StorePrice) => {
    setSelectedStore(store);
    setIsRedirectOpen(true);
  };

  return (
    <div className={`min-h-screen ${isGaslight ? 'gaslight-active' : ''}`}>
      {/* Header */}
      <Header
        onOpenAI={() => setIsAIOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        savedCount={1}
        cartCount={0}
        isGaslightMode={isGaslight}
        onToggleGaslight={() => setIsGaslight(!isGaslight)}
      />

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center space-x-2 text-xs text-vintage-leather/80">
          <Link
            href="/"
            className="flex items-center space-x-1 font-semibold text-vintage-mahogany transition hover:text-amber-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Promenade Market</span>
          </Link>
          <span>/</span>
          <span className="font-medium text-stone-600">{product.storefrontName}</span>
          <span>/</span>
          <span className="font-bold text-vintage-mahogany line-clamp-1">{product.title}</span>
        </div>

        {/* Product Gallery & Primary Comparison */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Image Gallery (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative overflow-hidden rounded-2xl border-2 border-vintage-gold/40 bg-white shadow-vintageCard">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[activeImageIdx] || product.thumbnail}
                alt={product.title}
                className="h-96 w-full object-cover transition duration-500 hover:scale-105"
              />
              <div className="absolute left-3 top-3">
                <span className="rounded-full border border-vintage-gold/40 bg-vintage-deepMahogany/90 px-3 py-1 text-xs font-semibold text-vintage-gold shadow-md">
                  {product.categoryLabel}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition ${
                      activeImageIdx === idx
                        ? 'border-vintage-gold shadow-brass scale-105'
                        : 'border-vintage-leather/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Price Arbitrage Highlight */}
            <div className="rounded-xl border border-emerald-700/30 bg-emerald-50/80 p-4 text-xs text-emerald-950">
              <div className="flex items-center space-x-2 font-bold text-emerald-900">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Arbitrage Verified by CobbleCart Bot:</span>
              </div>
              <p className="mt-1 leading-relaxed">
                Cheapest retailer: <strong className="font-bold">{cheapest.store}</strong> at{' '}
                <span className="font-bold text-emerald-800">{formatINR(cheapest.price)}</span>.
                {savings > 0 && ` You save ${formatINR(savings)} compared to competitors.`}
              </p>
            </div>
          </div>

          {/* Right Column: Title, Specs & Price Matrix (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-vintage-gold">
                {product.brand} &bull; {product.storefrontName}
              </span>
              <h1 className="mt-1 font-serif text-2xl font-black text-vintage-deepMahogany sm:text-3xl">
                {product.title}
              </h1>
              <p className="mt-2 text-sm text-vintage-leather/80 leading-relaxed">
                {product.description}
              </p>

              {/* Rating */}
              <div className="mt-3 flex items-center space-x-3 text-xs text-stone-600">
                <div className="flex items-center space-x-1 rounded bg-amber-100 px-2 py-0.5 font-bold text-amber-900">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.overallRating} / 5</span>
                </div>
                <span>&bull;</span>
                <span>{product.totalReviews.toLocaleString('en-IN')} Verified Buyer Reviews</span>
              </div>
            </div>

            {/* Multi-Store Price Comparison Matrix */}
            <PriceComparisonCard
              product={product}
              onSelectBuy={handleBuy}
            />

            {/* Key Features List */}
            <div className="rounded-xl border border-vintage-leather/20 bg-vintage-parchment p-5 shadow-sm">
              <h3 className="font-serif text-sm font-bold text-vintage-mahogany uppercase tracking-wider">
                Craftsmanship & Key Features
              </h3>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-xs text-vintage-leather sm:grid-cols-2">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Gen AI Review Analysis & Price History */}
        <div className="mt-12 space-y-8">
          {/* AI Sentiment Component */}
          <ReviewSentimentAnalyzer product={product} />

          {/* Price History Ledger */}
          <div className="rounded-2xl border border-vintage-gold/30 bg-vintage-parchment p-6 shadow-vintageCard">
            <div className="flex items-center space-x-2 border-b border-vintage-leather/20 pb-3">
              <History className="h-5 w-5 text-vintage-gold" />
              <h3 className="font-serif text-lg font-bold text-vintage-mahogany">
                30-Day Historical Price Tracking Ledger
              </h3>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {product.priceHistory.map((pt, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-vintage-leather/20 bg-vintage-cream/60 p-3 text-center"
                >
                  <span className="text-[11px] font-semibold text-stone-500">{pt.date}</span>
                  <p className="mt-1 font-serif text-sm font-black text-vintage-deepMahogany">
                    {formatINR(pt.price)}
                  </p>
                  <span className="mt-1 inline-block rounded bg-stone-200 px-1.5 py-0.5 text-[10px] text-stone-700">
                    {pt.store}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="rounded-2xl border border-vintage-gold/30 bg-vintage-parchment p-6 shadow-vintageCard">
            <h3 className="font-serif text-lg font-bold text-vintage-mahogany border-b border-vintage-leather/20 pb-3">
              Technical Ledger & Specifications
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div
                  key={key}
                  className="flex justify-between rounded-lg border border-vintage-leather/15 bg-white p-3 text-xs"
                >
                  <span className="font-medium text-stone-500">{key}:</span>
                  <span className="font-bold text-vintage-mahogany text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RedirectModal
        isOpen={isRedirectOpen}
        onClose={() => setIsRedirectOpen(false)}
        product={product}
        selectedStore={selectedStore}
      />

      <AIConciergeDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        catalog={PRODUCTS}
        initialProductPrompt={product}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={{ name: 'Arthur Pendelton', email: 'arthur.dev@cobblecart.com' }}
        onLogin={() => setIsAuthOpen(false)}
        onLogout={() => setIsAuthOpen(false)}
      />
    </div>
  );
}
