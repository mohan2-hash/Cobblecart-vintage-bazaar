'use client';

import React from 'react';
import { STOREFRONTS } from '@/lib/products-data';
import { Cpu, Disc3, Clock, Shirt, BookOpen, Lamp, Flame, ChevronRight } from 'lucide-react';

interface VictorianPromenadeProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  isGaslightMode: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="h-6 w-6 text-vintage-gold" />,
  Disc3: <Disc3 className="h-6 w-6 text-vintage-amber" />,
  Clock: <Clock className="h-6 w-6 text-vintage-brass" />,
  Shirt: <Shirt className="h-6 w-6 text-vintage-sand" />,
  BookOpen: <BookOpen className="h-6 w-6 text-emerald-400" />,
  Lamp: <Lamp className="h-6 w-6 text-amber-300" />,
};

export function VictorianPromenade({
  selectedCategory,
  onSelectCategory,
  isGaslightMode,
}: VictorianPromenadeProps) {
  return (
    <section className="relative overflow-hidden border-b border-vintage-gold/30 bg-gradient-to-b from-vintage-deepMahogany via-vintage-mahogany to-vintage-deepMahogany py-10 text-vintage-parchment shadow-2xl">
      {/* Cobblestone and Ambient Street Lamp Background */}
      <div className="absolute inset-0 opacity-15">
        <div className="h-full w-full bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Streetlamps flanking the promenade */}
      <div className="pointer-events-none absolute left-6 top-8 hidden lg:block">
        <div className="flex flex-col items-center">
          <div className={`h-12 w-12 rounded-full border-2 border-vintage-gold/60 bg-vintage-amber/20 ${isGaslightMode ? 'animate-lantern' : 'opacity-40'}`}>
            <Flame className="m-auto h-7 w-7 text-vintage-amber" />
          </div>
          <div className="h-40 w-1.5 bg-gradient-to-b from-vintage-gold via-vintage-leather to-transparent" />
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 top-8 hidden lg:block">
        <div className="flex flex-col items-center">
          <div className={`h-12 w-12 rounded-full border-2 border-vintage-gold/60 bg-vintage-amber/20 ${isGaslightMode ? 'animate-lantern' : 'opacity-40'}`}>
            <Flame className="m-auto h-7 w-7 text-vintage-amber" />
          </div>
          <div className="h-40 w-1.5 bg-gradient-to-b from-vintage-gold via-vintage-leather to-transparent" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Street Hero Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center space-x-2 rounded-full border border-vintage-gold/40 bg-vintage-gold/10 px-4 py-1 text-xs font-semibold tracking-widest text-vintage-gold uppercase">
            <span>&bull; The Royal Cobblestone Promenade &bull;</span>
          </div>
          <h1 className="mt-3 font-serif text-3xl font-extrabold tracking-tight text-vintage-parchment sm:text-5xl">
            Stroll the Victorian Market
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-vintage-sand/80 sm:text-base">
            Select a boutique storefront to inspect curated wares, or compare real-time prices across
            <span className="font-semibold text-vintage-gold"> Flipkart</span> and{' '}
            <span className="font-semibold text-vintage-gold">Amazon</span> to claim verified bargains.
          </p>
        </div>

        {/* Storefront Façade Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {STOREFRONTS.map((store) => {
            const isSelected = selectedCategory === store.id;
            return (
              <button
                key={store.id}
                onClick={() => onSelectCategory(isSelected ? 'all' : store.id)}
                className={`group relative flex flex-col items-center rounded-xl border p-4 text-center transition-all duration-300 ${
                  isSelected
                    ? 'border-vintage-gold bg-vintage-gold/25 shadow-brass scale-105'
                    : 'border-vintage-gold/25 bg-vintage-mahogany/70 hover:border-vintage-gold/60 hover:bg-vintage-mahogany hover:shadow-lg'
                }`}
              >
                {/* Store Awning Arch */}
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-vintage-gold/40 bg-vintage-deepMahogany shadow-inner transition group-hover:scale-110">
                  {iconMap[store.icon]}
                </div>

                {/* Shop Signboard */}
                <h3 className="font-serif text-sm font-bold text-vintage-parchment transition group-hover:text-vintage-gold">
                  {store.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-[11px] text-vintage-sand/70">
                  {store.sub}
                </p>

                {/* Status indicator */}
                <div className="mt-3 flex items-center text-[10px] font-semibold tracking-wider uppercase text-vintage-gold">
                  <span>{isSelected ? 'Browsing Now' : 'Enter Shop'}</span>
                  <ChevronRight className="ml-0.5 h-3 w-3 transition group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* All Categories Toggle bar */}
        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={() => onSelectCategory('all')}
            className={`rounded-full px-5 py-1.5 text-xs font-semibold tracking-wider uppercase transition ${
              selectedCategory === 'all'
                ? 'border border-vintage-gold bg-vintage-gold text-vintage-deepMahogany shadow-brass'
                : 'border border-vintage-gold/40 text-vintage-sand hover:bg-vintage-gold/15 hover:text-vintage-gold'
            }`}
          >
            Display All Promenade Stalls (Full Flipkart & Amazon Catalog)
          </button>
        </div>
      </div>
    </section>
  );
}
