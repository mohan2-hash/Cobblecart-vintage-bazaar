'use client';

import React from 'react';
import { Product } from '@/types';
import { Sparkles, ThumbsUp, ThumbsDown, TrendingDown, Clock, ShieldCheck, Check } from 'lucide-react';

interface ReviewSentimentAnalyzerProps {
  product: Product;
}

export function ReviewSentimentAnalyzer({ product }: ReviewSentimentAnalyzerProps) {
  const verdict = product.aiVerdict;
  if (!verdict) return null;

  return (
    <div className="rounded-2xl border-2 border-vintage-gold/40 bg-gradient-to-br from-amber-50/90 via-vintage-parchment to-vintage-cream/80 p-6 shadow-vintageCard">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-vintage-leather/20 pb-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-vintage-gold bg-vintage-deepMahogany text-vintage-gold shadow-brass">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="rounded bg-vintage-amber/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
                GenAI Market Synthesis
              </span>
              <span className="text-xs text-stone-500">
                &bull; Scanned {product.totalReviews.toLocaleString('en-IN')} Reviews from Flipkart & Amazon
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-vintage-mahogany">
              AI Buyer Sentiment & Purchase Verdict
            </h3>
          </div>
        </div>

        {/* Verdict Badge */}
        <div className="flex items-center space-x-2">
          {verdict.recommendation === 'BUY_NOW' && (
            <span className="inline-flex items-center space-x-1 rounded-full border border-emerald-600 bg-emerald-700 px-3.5 py-1 text-xs font-bold text-white shadow-sm">
              <Check className="h-3.5 w-3.5" />
              <span>Verdict: Buy Now (Optimal Price)</span>
            </span>
          )}
          {verdict.recommendation === 'WAIT_FOR_DROP' && (
            <span className="inline-flex items-center space-x-1 rounded-full border border-amber-600 bg-amber-600 px-3.5 py-1 text-xs font-bold text-white shadow-sm">
              <Clock className="h-3.5 w-3.5" />
              <span>Verdict: Wait for Festive Drop</span>
            </span>
          )}
        </div>
      </div>

      {/* Synthesis Summary */}
      <div className="mt-4 rounded-xl border border-vintage-gold/30 bg-white/70 p-4 font-serif text-sm leading-relaxed text-vintage-deepMahogany">
        <p className="italic">
          &ldquo;{verdict.verdictSummary}&rdquo;
        </p>
      </div>

      {/* Dual Column: Pros vs Cons */}
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Pros */}
        <div className="rounded-xl border border-emerald-700/20 bg-emerald-50/60 p-4">
          <div className="flex items-center space-x-2 font-serif text-xs font-bold uppercase tracking-wider text-emerald-900">
            <ThumbsUp className="h-4 w-4 text-emerald-600" />
            <span>Key Strengths (Consensus across 10,000+ reviews)</span>
          </div>
          <ul className="mt-3 space-y-2">
            {verdict.pros.map((pro, idx) => (
              <li key={idx} className="flex items-start text-xs text-emerald-950">
                <span className="mr-2 text-emerald-600">&bull;</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="rounded-xl border border-red-800/20 bg-red-50/50 p-4">
          <div className="flex items-center space-x-2 font-serif text-xs font-bold uppercase tracking-wider text-red-900">
            <ThumbsDown className="h-4 w-4 text-red-600" />
            <span>Reported Drawbacks & Considerations</span>
          </div>
          <ul className="mt-3 space-y-2">
            {verdict.cons.map((con, idx) => (
              <li key={idx} className="flex items-start text-xs text-red-950">
                <span className="mr-2 text-red-600">&bull;</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Price Volatility & Drop Probability */}
      <div className="mt-4 flex flex-wrap items-center justify-between rounded-xl border border-vintage-leather/20 bg-vintage-cream/80 p-3.5 text-xs">
        <div className="flex items-center space-x-2">
          <TrendingDown className="h-4 w-4 text-vintage-gold" />
          <span className="font-semibold text-vintage-mahogany">
            Estimated 30-Day Price Drop Probability:
          </span>
          <span className="font-mono font-bold text-vintage-deepMahogany">
            {verdict.priceDropProbability}% chance of lower price
          </span>
        </div>

        <div className="mt-2 text-[11px] text-stone-600 sm:mt-0">
          Cheapest Merchant: <strong className="text-vintage-mahogany">{verdict.cheapestStore}</strong>
        </div>
      </div>
    </div>
  );
}
