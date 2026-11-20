'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Product, ChatMessage } from '@/types';
import { formatINR } from '@/lib/utils';
import { X, Sparkles, Send, Bot, User, ArrowRight, CornerDownLeft } from 'lucide-react';
import Link from 'next/link';

interface AIConciergeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  catalog: Product[];
  initialProductPrompt?: Product | null;
}

export function AIConciergeDrawer({
  isOpen,
  onClose,
  catalog,
  initialProductPrompt,
}: AIConciergeDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'concierge',
      text: 'Good day! I am Barnaby Sterling, your AI Deal Concierge at CobbleCart.\n\nI track live prices across Flipkart, Amazon India, Croma, and vintage boutique workshops. Inquire about any product, request a price comparison, or ask whether a deal is at its historic low!',
      timestamp: 'Just now',
      suggestedProducts: ['audio-sony-wh1000xm5', 'elec-macbook-air-m3'],
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-fill prompt if product clicked
  useEffect(() => {
    if (initialProductPrompt) {
      const cheapest = initialProductPrompt.storePrices.reduce(
        (min, curr) => (curr.price < min.price ? curr : min),
        initialProductPrompt.storePrices[0]
      );
      setInput(`Is the deal on ${initialProductPrompt.title} at ${cheapest.store} currently worth buying, or will the price drop?`);
    }
  }, [initialProductPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (queryText?: string) => {
    const q = (queryText || input).trim();
    if (!q || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'concierge',
        text: data.text || 'My apologies, our telegraph connection fluttered. Allow me a moment.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedProducts: data.recommendedProductIds || [],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'concierge',
          text: 'Our telegraph wire encountered a momentary disturbance. Rest assured, I remain eager to assist with pricing and comparisons.',
          timestamp: 'Now',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const quickPrompts = [
    'Where is Sony WH-1000XM5 cheapest?',
    'Compare MacBook Air M3 prices: Amazon vs Flipkart',
    'Which vintage turntable has the best Ortofon cartridge?',
    'Will the Tissot watch drop in price next week?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="flex h-full w-full max-w-md flex-col border-l border-vintage-gold/50 bg-vintage-deepMahogany text-vintage-parchment shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-vintage-gold/30 bg-vintage-mahogany/90 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-vintage-gold bg-vintage-deepMahogany text-vintage-gold shadow-brass">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-base font-bold text-vintage-parchment">
                  Barnaby Sterling
                </h3>
                <span className="rounded bg-vintage-amber/20 px-1.5 py-0.5 text-[10px] font-semibold text-vintage-amber">
                  AI Concierge
                </span>
              </div>
              <p className="text-[11px] text-vintage-sand/70">
                Powered by Gemini &bull; Flipkart &bull; Amazon Arbitrage Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-vintage-sand transition hover:bg-vintage-gold/20 hover:text-vintage-gold"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center space-x-1.5 text-[11px] text-vintage-sand/60">
                  {isUser ? <User className="h-3 w-3" /> : <Sparkles className="h-3 w-3 text-vintage-gold" />}
                  <span>{isUser ? 'You' : 'Barnaby Sterling'} &bull; {msg.timestamp}</span>
                </div>

                <div
                  className={`mt-1 max-w-[88%] rounded-xl p-3.5 text-xs leading-relaxed shadow-sm whitespace-pre-line ${
                    isUser
                      ? 'border border-vintage-gold/40 bg-vintage-gold text-vintage-deepMahogany font-medium'
                      : 'border border-vintage-gold/20 bg-vintage-mahogany/80 text-vintage-parchment font-serif'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Suggested Product Cards from AI */}
                {!isUser && msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                  <div className="mt-2.5 w-full space-y-1.5">
                    {msg.suggestedProducts.map((pId) => {
                      const prod = catalog.find((p) => p.id === pId);
                      if (!prod) return null;
                      const cheapest = prod.storePrices.reduce(
                        (min, curr) => (curr.price < min.price ? curr : min),
                        prod.storePrices[0]
                      );
                      return (
                        <Link
                          key={pId}
                          href={`/product/${prod.id}`}
                          onClick={onClose}
                          className="flex items-center justify-between rounded-lg border border-vintage-gold/30 bg-vintage-deepMahogany/90 p-2 text-xs transition hover:border-vintage-gold hover:bg-vintage-mahogany"
                        >
                          <div className="flex items-center space-x-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={prod.thumbnail}
                              alt={prod.title}
                              className="h-9 w-9 rounded object-cover"
                            />
                            <div>
                              <p className="line-clamp-1 font-bold text-vintage-parchment font-serif">
                                {prod.title}
                              </p>
                              <p className="text-[10px] text-vintage-sand/70">
                                Cheapest on {cheapest.store}: <strong className="text-vintage-gold">{formatINR(cheapest.price)}</strong>
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-vintage-gold flex-shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center space-x-2 text-xs text-vintage-amber italic">
              <Sparkles className="h-4 w-4 animate-spin text-vintage-gold" />
              <span>Barnaby is consulting store ledgers across the promenade...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Query Pills */}
        <div className="border-t border-vintage-gold/20 bg-vintage-mahogany/40 px-3 py-2">
          <p className="text-[10px] font-semibold tracking-wider uppercase text-vintage-sand/60">
            Suggested Queries:
          </p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="rounded-full border border-vintage-gold/30 bg-vintage-deepMahogany/80 px-2.5 py-1 text-[11px] text-vintage-sand transition hover:border-vintage-gold hover:text-vintage-gold"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="border-t border-vintage-gold/30 bg-vintage-mahogany p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Inquire of Barnaby (e.g. Where is Sony XM5 cheaper?)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-lg border border-vintage-gold/30 bg-vintage-deepMahogany px-3 py-2 text-xs text-vintage-parchment placeholder-vintage-sand/40 focus:border-vintage-gold focus:outline-none focus:ring-1 focus:ring-vintage-gold"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-vintage-gold text-vintage-deepMahogany transition hover:bg-vintage-antiqueGold disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
