'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS, getCheapestStore, calculateMaxSavings } from '@/lib/products-data';
import { Product, StorePrice } from '@/types';
import { Header } from '@/components/Header';
import { VictorianPromenade } from '@/components/VictorianPromenade';
import { ProductCard } from '@/components/ProductCard';
import { PriceComparisonCard } from '@/components/PriceComparisonCard';
import { AIConciergeDrawer } from '@/components/AIConciergeDrawer';
import { RedirectModal } from '@/components/RedirectModal';
import { AuthModal } from '@/components/AuthModal';
import { formatINR } from '@/lib/utils';
import {
  Sparkles,
  ArrowRightLeft,
  Flame,
  Filter,
  CheckCircle2,
  TrendingDown,
  Layers,
  Compass,
  Github,
  Award,
} from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [storeFilter, setStoreFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isGaslightMode, setIsGaslightMode] = useState<boolean>(true);

  // Modals & Drawers
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiTargetProduct, setAiTargetProduct] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>({
    name: 'Arthur Pendelton',
    email: 'arthur.dev@cobblecart.com',
  });
  const [savedProductIds, setSavedProductIds] = useState<string[]>(['audio-sony-wh1000xm5']);

  // Redirect / Buy Modal
  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
  const [redirectProduct, setRedirectProduct] = useState<Product | null>(null);
  const [redirectStore, setRedirectStore] = useState<StorePrice | null>(null);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }

    if (storeFilter !== 'all') {
      list = list.filter((p) =>
        p.storePrices.some((s) => s.store.toLowerCase() === storeFilter.toLowerCase())
      );
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => getCheapestStore(a).price - getCheapestStore(b).price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => getCheapestStore(b).price - getCheapestStore(a).price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.overallRating - a.overallRating);
    } else if (sortBy === 'savings') {
      list.sort((a, b) => calculateMaxSavings(b) - calculateMaxSavings(a));
    }

    return list;
  }, [selectedCategory, searchQuery, storeFilter, sortBy]);

  // Arbitrage Spotlight Items (Highest savings across Flipkart/Amazon)
  const arbitrageDeals = useMemo(() => {
    return [...PRODUCTS]
      .filter((p) => calculateMaxSavings(p) > 2000)
      .sort((a, b) => calculateMaxSavings(b) - calculateMaxSavings(a))
      .slice(0, 3);
  }, []);

  const handleOpenBuy = (product: Product, store: StorePrice) => {
    setRedirectProduct(product);
    setRedirectStore(store);
    setIsRedirectModalOpen(true);
  };

  const handleOpenConciergeWithProduct = (product: Product) => {
    setAiTargetProduct(product);
    setIsAIModalOpen(true);
  };

  const handleToggleSave = (productId: string) => {
    setSavedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  return (
    <div className={`min-h-screen ${isGaslightMode ? 'gaslight-active' : ''}`}>
      {/* Promenade Header */}
      <Header
        onOpenAI={() => {
          setAiTargetProduct(null);
          setIsAIModalOpen(true);
        }}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        savedCount={savedProductIds.length}
        cartCount={1}
        onSearchChange={(q) => setSearchQuery(q)}
        isGaslightMode={isGaslightMode}
        onToggleGaslight={() => setIsGaslightMode(!isGaslightMode)}
      />

      {/* Victorian Promenade Streetfront Facades */}
      <VictorianPromenade
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        isGaslightMode={isGaslightMode}
      />

      {/* Main Street Content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Arbitrage Spotlight Banner ("Bargain Alley") */}
        <section id="deals" className="mb-10">
          <div className="rounded-2xl border-2 border-vintage-gold/50 bg-gradient-to-r from-vintage-deepMahogany via-vintage-mahogany to-vintage-deepMahogany p-6 text-vintage-parchment shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-vintage-gold/30 pb-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-vintage-gold bg-vintage-gold/20 text-vintage-gold shadow-brass">
                  <ArrowRightLeft className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="rounded bg-vintage-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-vintage-deepMahogany">
                      Arbitrage Desk
                    </span>
                    <span className="text-xs text-vintage-sand/70">
                      Live Price Discrepancies between Flipkart & Amazon
                    </span>
                  </div>
                  <h2 className="font-serif text-xl font-black text-vintage-parchment sm:text-2xl">
                    Top Verified Deals of the Day
                  </h2>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-vintage-sand/60">Automated Bot Verifier</span>
                <p className="font-mono text-xs font-bold text-vintage-gold">
                  100% Guaranteed Lowest Merchant Price
                </p>
              </div>
            </div>

            {/* Spotlight Grid */}
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              {arbitrageDeals.map((prod) => {
                const cheapest = getCheapestStore(prod);
                const savings = calculateMaxSavings(prod);

                return (
                  <div
                    key={prod.id}
                    className="flex flex-col justify-between rounded-xl border border-vintage-gold/30 bg-vintage-mahogany/80 p-4 transition duration-300 hover:border-vintage-gold hover:bg-vintage-mahogany"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-600/40">
                          Save {formatINR(savings)}
                        </span>
                        <span className="text-[11px] text-vintage-sand/60">
                          {prod.categoryLabel}
                        </span>
                      </div>

                      <h4 className="mt-2 line-clamp-1 font-serif text-sm font-bold text-vintage-parchment">
                        {prod.title}
                      </h4>

                      <div className="mt-3 flex items-baseline justify-between">
                        <div>
                          <span className="text-[11px] text-vintage-sand/70">Cheapest at:</span>
                          <p className="font-bold text-vintage-gold">{cheapest.store}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-serif text-lg font-black text-white">
                            {formatINR(cheapest.price)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenBuy(prod, cheapest)}
                      className="mt-4 flex w-full items-center justify-center space-x-1 rounded-lg border border-vintage-gold bg-vintage-gold py-2 text-xs font-bold text-vintage-deepMahogany transition hover:bg-vintage-antiqueGold"
                    >
                      <span>Claim Deal on {cheapest.store}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Filter and Control Toolbar */}
        <section className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-vintage-gold/30 bg-vintage-parchment p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center text-xs font-bold uppercase tracking-wider text-vintage-mahogany">
              <Filter className="mr-1.5 h-3.5 w-3.5 text-vintage-gold" />
              Filter by Merchant:
            </span>

            {['all', 'Flipkart', 'Amazon', 'Croma', 'Vintage Emporium'].map((storeName) => (
              <button
                key={storeName}
                onClick={() => setStoreFilter(storeName)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  storeFilter === storeName
                    ? 'border border-vintage-gold bg-vintage-deepMahogany text-vintage-gold shadow-sm'
                    : 'border border-vintage-leather/20 bg-white text-vintage-leather hover:bg-vintage-cream'
                }`}
              >
                {storeName === 'all' ? 'All Merchants' : storeName}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs text-stone-500">
              Showing <strong>{filteredProducts.length}</strong> Wares
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-vintage-leather/30 bg-white px-3 py-1.5 text-xs font-medium text-vintage-mahogany focus:border-vintage-gold focus:outline-none"
            >
              <option value="featured">Sort by: Curated Promenade</option>
              <option value="savings">Sort by: Highest Arbitrage Savings</option>
              <option value="price-low">Sort by: Price (Lowest First)</option>
              <option value="price-high">Sort by: Price (Highest First)</option>
              <option value="rating">Sort by: Customer Rating</option>
            </select>
          </div>
        </section>

        {/* Product Catalog Grid */}
        <section>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectBuy={handleOpenBuy}
                  onOpenConciergeWithProduct={handleOpenConciergeWithProduct}
                  isSaved={savedProductIds.includes(product.id)}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-vintage-gold/40 p-12 text-center">
              <Compass className="mx-auto h-12 w-12 text-vintage-gold/60" />
              <h3 className="mt-3 font-serif text-lg font-bold text-vintage-mahogany">
                No wares discovered matching your query
              </h3>
              <p className="mt-1 text-xs text-stone-500">
                Try clearing your search query or switching merchants to stroll other stalls.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setStoreFilter('all');
                }}
                className="mt-4 rounded-xl border border-vintage-gold bg-vintage-gold px-4 py-2 text-xs font-bold text-vintage-deepMahogany shadow-sm transition hover:bg-vintage-antiqueGold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Victorian Promenade Footer */}
      <footer className="mt-16 border-t-2 border-vintage-gold/40 bg-vintage-deepMahogany text-vintage-parchment">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Compass className="h-6 w-6 text-vintage-gold" />
                <span className="font-serif text-lg font-bold text-vintage-parchment">
                  CobbleCart Vintage Bazaar
                </span>
              </div>
              <p className="text-xs leading-relaxed text-vintage-sand/70">
                A multi-store price verification portal and GenAI shopping concierge built with Next.js 14, TypeScript, Tailwind CSS, and Google Gemini API.
              </p>
              <div className="flex items-center space-x-2 text-xs text-vintage-gold">
                <Flame className="h-4 w-4 animate-lantern text-vintage-amber" />
                <span>Cobblestone & Gaslight Edition &bull; Est. 1888</span>
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-vintage-gold">
                Promenade Stalls
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-vintage-sand/80">
                <li>&bull; The Edison Electric Guild (Electronics)</li>
                <li>&bull; The Gramophone & Valve Works (Audio)</li>
                <li>&bull; Crown & Escapement (Horology)</li>
                <li>&bull; Savile Row Heritage (Apparel)</li>
                <li>&bull; The Antiquarian Scriptorium (Books & Pens)</li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-vintage-gold">
                Price Verification Feeds
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-vintage-sand/80">
                <li>&bull; Flipkart Live API Integration</li>
                <li>&bull; Amazon India Deal Crawler</li>
                <li>&bull; Croma Express Pickup Feed</li>
                <li>&bull; Vintage Emporium White-Glove Desk</li>
                <li>&bull; Automated Arbitrage Savings Calculator</li>
              </ul>
            </div>

            {/* Col 4 - Portfolio Showcase Info */}
            <div className="rounded-xl border border-vintage-gold/30 bg-vintage-mahogany/80 p-4">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-vintage-gold">
                <Award className="h-4 w-4" />
                <span>GitHub Portfolio Highlights</span>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-vintage-sand/70">
                Designed for **Full-Stack**, **AI/ML**, and **Java/Backend** engineering portfolios. Features live cross-store comparison, Gemini conversational concierge, and review synthesis.
              </p>
              <div className="mt-3">
                <span className="rounded bg-vintage-gold/20 px-2 py-0.5 font-mono text-[10px] text-vintage-gold">
                  Status: Production Ready
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-vintage-gold/20 pt-6 text-center text-xs text-vintage-sand/50">
            &copy; 2026 CobbleCart Inc. Crafted with Victorian distinction for developer portfolios.
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <AIConciergeDrawer
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        catalog={PRODUCTS}
        initialProductPrompt={aiTargetProduct}
      />

      <RedirectModal
        isOpen={isRedirectModalOpen}
        onClose={() => setIsRedirectModalOpen(false)}
        product={redirectProduct}
        selectedStore={redirectStore}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={(u) => setCurrentUser(u)}
        onLogout={() => setCurrentUser(null)}
      />
    </div>
  );
}
