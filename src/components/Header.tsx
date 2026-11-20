'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Flame,
  Search,
  Bookmark,
  ShoppingBag,
  Sparkles,
  User as UserIcon,
  Compass,
  ArrowRightLeft,
  Sun,
  Moon,
} from 'lucide-react';

interface HeaderProps {
  onOpenAI: () => void;
  onOpenAuth: () => void;
  savedCount: number;
  cartCount: number;
  onSearchChange?: (val: string) => void;
  isGaslightMode: boolean;
  onToggleGaslight: () => void;
}

export function Header({
  onOpenAI,
  onOpenAuth,
  savedCount,
  cartCount,
  onSearchChange,
  isGaslightMode,
  onToggleGaslight,
}: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' BST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) onSearchChange(searchValue);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-vintage-gold/30 bg-vintage-deepMahogany/95 text-vintage-parchment backdrop-blur-md shadow-lg">
      {/* Top Victorian Registry Ticker */}
      <div className="border-b border-vintage-gold/20 bg-vintage-mahogany/80 px-4 py-1.5 text-xs text-vintage-sand/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-vintage-amber">
              <Flame className="mr-1 h-3.5 w-3.5 animate-lantern" />
              Gaslight Bazaar Edition
            </span>
            <span className="hidden text-vintage-sand/40 md:inline">|</span>
            <span className="hidden md:inline">
              Telegraph Price Feeds Connected:{' '}
              <strong className="text-vintage-gold">Flipkart</strong> &bull;{' '}
              <strong className="text-vintage-gold">Amazon India</strong> &bull;{' '}
              <strong className="text-vintage-gold">Croma</strong>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-mono text-[11px] text-vintage-gold tracking-widest">
              LONDON &bull; {timeString || '15:10:00 BST'}
            </span>
            <button
              onClick={onToggleGaslight}
              className="flex items-center space-x-1.5 rounded-full border border-vintage-gold/30 px-2.5 py-0.5 text-[11px] transition hover:bg-vintage-gold/20"
              title="Toggle Gaslight Ambience"
            >
              {isGaslightMode ? (
                <>
                  <Sun className="h-3 w-3 text-vintage-amber" />
                  <span>Daylight Promenade</span>
                </>
              ) : (
                <>
                  <Moon className="h-3 w-3 text-vintage-gold" />
                  <span>Gaslight Evening</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Promenade Header Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5">
        {/* Brand Emblem */}
        <Link href="/" className="group flex items-center space-x-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-vintage-gold bg-gradient-to-br from-vintage-gold/30 to-vintage-mahogany text-vintage-gold shadow-brass transition group-hover:scale-105">
            <Compass className="h-6 w-6 transition group-hover:rotate-45" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl font-bold tracking-wider text-vintage-parchment">
                COBBLE<span className="text-vintage-gold">&</span>CART
              </span>
              <span className="rounded border border-vintage-gold/40 bg-vintage-gold/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-vintage-gold">
                EST. 1888
              </span>
            </div>
            <p className="text-[11px] tracking-wide text-vintage-sand/70">
              The Victorian Promenade &bull; Multi-Store Price Verifier &bull; GenAI Concierge
            </p>
          </div>
        </Link>

        {/* Global Live Search Bar */}
        <form
          onSubmit={handleSearch}
          className="relative mx-4 hidden max-w-md flex-1 md:block"
        >
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search across Flipkart, Amazon, Croma, & Boutiques..."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              className="w-full rounded-full border border-vintage-gold/40 bg-vintage-mahogany/90 py-2 pl-10 pr-24 text-sm text-vintage-parchment placeholder-vintage-sand/50 shadow-inner focus:border-vintage-gold focus:outline-none focus:ring-1 focus:ring-vintage-gold"
            />
            <Search className="absolute left-3.5 h-4 w-4 text-vintage-gold/70" />
            <button
              type="submit"
              className="absolute right-1.5 rounded-full bg-vintage-gold px-3.5 py-1 text-xs font-semibold text-vintage-deepMahogany transition hover:bg-vintage-antiqueGold"
            >
              Verify
            </button>
          </div>
        </form>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Ask AI Concierge Button */}
          <button
            onClick={onOpenAI}
            className="flex items-center space-x-2 rounded-full border border-vintage-amber bg-gradient-to-r from-vintage-amber/20 to-vintage-gold/20 px-3.5 py-2 text-xs font-semibold text-vintage-amber shadow-gaslight transition hover:scale-105 hover:bg-vintage-amber/30"
          >
            <Sparkles className="h-4 w-4 animate-spin text-vintage-amber" />
            <span className="hidden sm:inline">Ask AI Concierge</span>
          </button>

          {/* Price Arbitrage Shortcut */}
          <Link
            href="/#deals"
            className="hidden items-center space-x-1.5 rounded-lg border border-vintage-gold/30 px-3 py-2 text-xs font-medium text-vintage-sand transition hover:border-vintage-gold hover:text-vintage-gold lg:flex"
          >
            <ArrowRightLeft className="h-3.5 w-3.5 text-vintage-gold" />
            <span>Best Arbitrage</span>
          </Link>

          {/* Watchlist Counter */}
          <button
            onClick={onOpenAuth}
            className="relative rounded-lg border border-vintage-gold/30 p-2 text-vintage-sand transition hover:border-vintage-gold hover:text-vintage-gold"
            title="Saved Price Drop Alerts"
          >
            <Bookmark className="h-4 w-4" />
            {savedCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-vintage-gold text-[10px] font-bold text-vintage-deepMahogany">
                {savedCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenAuth}
            className="relative rounded-lg border border-vintage-gold/30 p-2 text-vintage-sand transition hover:border-vintage-gold hover:text-vintage-gold"
            title="Shopping Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-vintage-amber text-[10px] font-bold text-vintage-deepMahogany">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Sign In */}
          <button
            onClick={onOpenAuth}
            className="flex items-center space-x-1.5 rounded-full border border-vintage-gold/50 bg-vintage-gold/15 px-3 py-1.5 text-xs font-semibold text-vintage-gold transition hover:bg-vintage-gold hover:text-vintage-deepMahogany"
          >
            <UserIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sign In</span>
          </button>
        </div>
      </div>
    </header>
  );
}
