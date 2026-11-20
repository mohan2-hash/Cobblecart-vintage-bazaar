'use client';

import React from 'react';
import { Product, StorePrice } from '@/types';
import { formatINR, calculateDiscount } from '@/lib/utils';
import { CheckCircle2, ExternalLink, ShieldCheck, Truck, Tag, TrendingDown } from 'lucide-react';

interface PriceComparisonCardProps {
  product: Product;
  onSelectBuy: (product: Product, store: StorePrice) => void;
}

export function PriceComparisonCard({ product, onSelectBuy }: PriceComparisonCardProps) {
  const inStockPrices = product.storePrices.filter((s) => s.inStock);
  const cheapest = inStockPrices.reduce(
    (min, curr) => (curr.price < min.price ? curr : min),
    product.storePrices[0]
  );
  const highest = inStockPrices.reduce(
    (max, curr) => (curr.price > max.price ? curr : max),
    product.storePrices[0]
  );
  const maxSavings = highest.price - cheapest.price;

  return (
    <div className="rounded-xl border border-vintage-gold/30 bg-vintage-parchment p-5 shadow-vintageCard">
      {/* Comparator Banner */}
      <div className="flex flex-wrap items-center justify-between border-b border-vintage-leather/20 pb-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-800">
            <ShieldCheck className="h-4 w-4" />
            <span>Verified Price Matrix &bull; Live Automated Check</span>
          </div>
          <h3 className="mt-1 font-serif text-lg font-bold text-vintage-mahogany">
            Compare Across Indian Retail Outlets
          </h3>
        </div>

        {maxSavings > 0 && (
          <div className="mt-2 flex items-center space-x-2 rounded-lg border border-emerald-600/30 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-900 sm:mt-0">
            <TrendingDown className="h-4 w-4 text-emerald-600" />
            <span>Max Arbitrage Savings: {formatINR(maxSavings)}</span>
          </div>
        )}
      </div>

      {/* Stores List */}
      <div className="mt-4 divide-y divide-vintage-leather/15">
        {product.storePrices.map((storeOption) => {
          const isCheapest = storeOption.store === cheapest.store && storeOption.inStock;
          const discount = calculateDiscount(storeOption.originalPrice, storeOption.price);

          return (
            <div
              key={storeOption.store}
              className={`flex flex-col justify-between py-3.5 transition-colors sm:flex-row sm:items-center ${
                isCheapest ? 'bg-amber-50/70 -mx-3 px-3 rounded-lg border border-vintage-gold/40' : ''
              }`}
            >
              {/* Store & Delivery Info */}
              <div className="flex items-start space-x-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-vintage-leather/30 bg-white shadow-sm">
                  {storeOption.store === 'Flipkart' && (
                    <span className="font-sans text-xs font-black text-blue-600">FK</span>
                  )}
                  {storeOption.store === 'Amazon' && (
                    <span className="font-sans text-xs font-black text-amber-600">AMZ</span>
                  )}
                  {storeOption.store === 'Croma' && (
                    <span className="font-sans text-xs font-black text-emerald-600">CR</span>
                  )}
                  {storeOption.store === 'Vintage Emporium' && (
                    <span className="font-serif text-xs font-black text-vintage-leather">VE</span>
                  )}
                  {storeOption.store === 'Official Store' && (
                    <span className="font-sans text-xs font-black text-stone-700">OFF</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-serif text-sm font-bold text-vintage-mahogany">
                      {storeOption.store}
                    </span>
                    {isCheapest && (
                      <span className="rounded bg-emerald-700 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        Cheapest Deal
                      </span>
                    )}
                    {storeOption.badge && !isCheapest && (
                      <span className="rounded bg-vintage-gold/20 px-1.5 py-0.5 text-[10px] font-semibold text-vintage-leather">
                        {storeOption.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-vintage-leather/80">
                    <span className="flex items-center">
                      <Truck className="mr-1 h-3 w-3 text-vintage-leather/60" />
                      {storeOption.deliveryText}
                    </span>
                    <span>&bull;</span>
                    <span>{storeOption.rating} ★ ({storeOption.reviewCount.toLocaleString('en-IN')})</span>
                  </div>

                  {storeOption.offers.length > 0 && (
                    <div className="mt-1 flex items-center space-x-1 text-[11px] text-amber-900">
                      <Tag className="h-3 w-3 text-vintage-gold" />
                      <span>{storeOption.offers[0]}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="mt-3 flex items-center justify-between sm:mt-0 sm:flex-col sm:items-end sm:justify-center">
                <div className="text-left sm:text-right">
                  <div className="flex items-baseline space-x-2 sm:justify-end">
                    <span className="font-serif text-lg font-extrabold text-vintage-deepMahogany">
                      {formatINR(storeOption.price)}
                    </span>
                    {storeOption.originalPrice > storeOption.price && (
                      <span className="text-xs text-stone-500 line-through">
                        {formatINR(storeOption.originalPrice)}
                      </span>
                    )}
                  </div>
                  {discount > 0 && (
                    <span className="text-[11px] font-semibold text-emerald-700">
                      {discount}% Off MSRP
                    </span>
                  )}
                </div>

                <div className="ml-4 sm:ml-0 sm:mt-2">
                  {storeOption.inStock ? (
                    <button
                      onClick={() => onSelectBuy(product, storeOption)}
                      className={`flex items-center space-x-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition shadow-sm ${
                        isCheapest
                          ? 'border border-vintage-gold bg-vintage-gold text-vintage-deepMahogany hover:bg-vintage-antiqueGold'
                          : 'border border-vintage-leather/30 bg-white text-vintage-leather hover:bg-vintage-cream'
                      }`}
                    >
                      <span>Buy on {storeOption.store}</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  ) : (
                    <span className="rounded bg-stone-200 px-3 py-1.5 text-xs font-medium text-stone-500">
                      Sold Out
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
