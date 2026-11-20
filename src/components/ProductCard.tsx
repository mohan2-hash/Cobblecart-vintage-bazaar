'use client';

import React from 'react';
import Link from 'next/link';
import { Product, StorePrice } from '@/types';
import { formatINR } from '@/lib/utils';
import { Star, ShieldAlert, Sparkles, ExternalLink, Bookmark, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectBuy: (product: Product, store: StorePrice) => void;
  onOpenConciergeWithProduct: (product: Product) => void;
  isSaved?: boolean;
  onToggleSave?: (productId: string) => void;
}

export function ProductCard({
  product,
  onSelectBuy,
  onOpenConciergeWithProduct,
  isSaved = false,
  onToggleSave,
}: ProductCardProps) {
  const inStockPrices = product.storePrices.filter((s) => s.inStock);
  const cheapest = inStockPrices.reduce(
    (min, curr) => (curr.price < min.price ? curr : min),
    product.storePrices[0]
  );
  const highest = inStockPrices.reduce(
    (max, curr) => (curr.price > max.price ? curr : max),
    product.storePrices[0]
  );
  const savings = highest.price - cheapest.price;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-vintage-gold/30 bg-vintage-parchment text-vintage-deepMahogany shadow-vintageCard transition-all duration-300 hover:-translate-y-1 hover:border-vintage-gold hover:shadow-2xl">
      {/* Top Heritage Badge & Bookmark */}
      <div className="relative h-56 w-full overflow-hidden bg-stone-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Vintage Vignette Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-vintage-mahogany/40 via-transparent to-transparent" />

        {/* Storefront / Category Ribbon */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full border border-vintage-gold/50 bg-vintage-deepMahogany/90 px-2.5 py-1 text-[11px] font-semibold text-vintage-gold shadow-sm backdrop-blur-sm">
            {product.categoryLabel}
          </span>
        </div>

        {/* Wishlist / Alert Bookmark */}
        {onToggleSave && (
          <button
            onClick={() => onToggleSave(product.id)}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-vintage-gold/40 bg-vintage-deepMahogany/80 text-vintage-sand backdrop-blur-sm transition hover:scale-110 hover:text-vintage-gold"
            title="Save Price Drop Alert"
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-vintage-gold text-vintage-gold' : ''}`} />
          </button>
        )}

        {/* Cheapest Store Callout Ribbon */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex items-center justify-between rounded-lg border border-vintage-gold/40 bg-vintage-deepMahogany/95 px-3 py-1.5 text-xs text-vintage-parchment shadow-lg backdrop-blur-md">
            <span className="flex items-center text-vintage-gold font-medium">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-400" />
              Cheapest on <strong className="ml-1 text-white">{cheapest.store}</strong>
            </span>
            {savings > 0 && (
              <span className="rounded bg-emerald-700/80 px-1.5 py-0.5 text-[10px] font-bold text-white">
                Save {formatINR(savings)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Brand & Rating */}
        <div className="flex items-center justify-between text-xs text-vintage-leather/80">
          <span className="font-semibold uppercase tracking-wider">{product.brand}</span>
          <div className="flex items-center space-x-1 text-amber-700">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span className="font-bold">{product.overallRating}</span>
            <span className="text-[11px] text-stone-500">({product.totalReviews.toLocaleString('en-IN')})</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/product/${product.id}`} className="mt-1.5">
          <h3 className="line-clamp-2 font-serif text-base font-bold text-vintage-mahogany transition group-hover:text-amber-900">
            {product.title}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-xs text-vintage-leather/70">
          {product.subtitle}
        </p>

        {/* Comparison Snippet */}
        <div className="mt-4 rounded-lg border border-vintage-leather/20 bg-vintage-cream/60 p-2.5 text-xs">
          <div className="flex items-center justify-between font-serif">
            <span className="text-stone-600">Best Deal Verified:</span>
            <span className="text-base font-extrabold text-vintage-deepMahogany">
              {formatINR(cheapest.price)}
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-stone-500">
            <span>Vs. {product.storePrices.find((s) => s.store !== cheapest.store)?.store || 'Others'}:</span>
            <span className="line-through">
              {formatINR(product.storePrices.find((s) => s.store !== cheapest.store)?.price || cheapest.originalPrice)}
            </span>
          </div>
        </div>

        {/* AI Verdict Pill */}
        {product.aiVerdict && (
          <div className="mt-2.5 flex items-center space-x-1.5 text-[11px] text-amber-900">
            <Sparkles className="h-3 w-3 text-vintage-gold flex-shrink-0" />
            <span className="line-clamp-1 italic">
              AI: {product.aiVerdict.verdictSummary}
            </span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center border-t border-vintage-leather/15 bg-vintage-cream/40 p-3 gap-2">
        {/* Full Details & Comparison */}
        <Link
          href={`/product/${product.id}`}
          className="flex-1 rounded-lg border border-vintage-leather/30 bg-white py-2 text-center text-xs font-semibold text-vintage-mahogany transition hover:border-vintage-gold hover:bg-vintage-parchment"
        >
          Compare All Stores
        </Link>

        {/* Direct Buy from Cheapest Store */}
        <button
          onClick={() => onSelectBuy(product, cheapest)}
          className="flex items-center space-x-1 rounded-lg border border-vintage-gold bg-vintage-gold px-3.5 py-2 text-xs font-bold text-vintage-deepMahogany shadow-sm transition hover:bg-vintage-antiqueGold"
          title={`Direct Redirect to ${cheapest.store}`}
        >
          <span>Buy on {cheapest.store}</span>
          <ExternalLink className="h-3 w-3" />
        </button>

        {/* Ask AI button */}
        <button
          onClick={() => onOpenConciergeWithProduct(product)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-vintage-amber/40 bg-vintage-deepMahogany text-vintage-amber transition hover:scale-105"
          title="Ask AI Concierge about this product"
        >
          <Sparkles className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
