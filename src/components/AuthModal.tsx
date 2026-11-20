'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: { name: string; email: string } | null;
  onLogin: (user: { name: string; email: string }) => void;
  onLogout: () => void;
}

export function AuthModal({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onLogin({
      name: name || email.split('@')[0],
      email: email,
    });
    onClose();
  };

  const handleQuickDemo = (demoName: string, demoEmail: string) => {
    onLogin({ name: demoName, email: demoEmail });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border-2 border-vintage-gold bg-vintage-parchment text-vintage-deepMahogany shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-vintage-leather/30 bg-white/80 p-1.5 text-vintage-leather transition hover:bg-vintage-cream"
        >
          <X className="h-4 w-4" />
        </button>

        {currentUser ? (
          /* Logged In View */
          <div className="p-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-vintage-gold bg-vintage-gold/20 text-vintage-leather shadow-inner">
              <User className="h-7 w-7 text-vintage-mahogany" />
            </div>

            <h3 className="mt-3 font-serif text-xl font-bold text-vintage-mahogany">
              Welcome, {currentUser.name}
            </h3>
            <p className="font-mono text-xs text-stone-500">{currentUser.email}</p>

            <div className="mt-4 rounded-xl border border-vintage-leather/20 bg-vintage-cream/60 p-3 text-left text-xs text-vintage-leather">
              <div className="flex items-center space-x-2 font-semibold text-vintage-mahogany">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Patron Status: Verified Victorian Member</span>
              </div>
              <p className="mt-1 text-[11px] text-stone-600">
                You have active price tracking across Flipkart & Amazon India. You will receive telegraph alerts whenever your watched items hit their all-time lowest price.
              </p>
            </div>

            <div className="mt-6 flex space-x-2">
              <button
                onClick={onLogout}
                className="flex-1 rounded-xl border border-stone-300 bg-white py-2.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-50"
              >
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-vintage-gold bg-vintage-gold py-2.5 text-xs font-bold text-vintage-deepMahogany shadow-sm transition hover:bg-vintage-antiqueGold"
              >
                Close Ledger
              </button>
            </div>
          </div>
        ) : (
          /* Login / Register Form */
          <div>
            <div className="border-b border-vintage-gold/40 bg-vintage-deepMahogany px-6 py-5 text-vintage-parchment">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-vintage-amber">
                <ShieldCheck className="h-4 w-4" />
                <span>Member Registry & Price Alert Subscription</span>
              </div>
              <h3 className="mt-1 font-serif text-xl font-bold text-vintage-parchment">
                {isRegister ? 'Register Patron Account' : 'Sign in to CobbleCart'}
              </h3>
              <p className="text-xs text-vintage-sand/70">
                Sync your shopping cart, price drop alerts, and personalized concierge history.
              </p>
            </div>

            <div className="p-6">
              {/* Quick 1-Click Demo Profiles for Recruiters */}
              <div className="mb-4 rounded-xl border border-vintage-amber/40 bg-amber-50/80 p-3 text-xs">
                <div className="flex items-center space-x-1.5 font-bold text-amber-900">
                  <Sparkles className="h-3.5 w-3.5 text-vintage-gold" />
                  <span>Recruiter & Quick-Test 1-Click Logins:</span>
                </div>
                <div className="mt-2 flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('Arthur Pendelton (Dev)', 'arthur.dev@cobblecart.com')}
                    className="flex-1 rounded-lg border border-vintage-gold/40 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-vintage-mahogany shadow-sm transition hover:bg-vintage-cream"
                  >
                    Arthur (Dev Profile)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('Lady Eleanor Vance', 'eleanor@cobblecart.com')}
                    className="flex-1 rounded-lg border border-vintage-gold/40 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-vintage-mahogany shadow-sm transition hover:bg-vintage-cream"
                  >
                    Eleanor (Shopper)
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {isRegister && (
                  <div>
                    <label className="block text-xs font-semibold text-vintage-mahogany">
                      Your Full Name
                    </label>
                    <div className="relative mt-1">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Samuel Bennett"
                        className="w-full rounded-lg border border-vintage-leather/30 bg-white px-3 py-2 pl-9 text-xs focus:border-vintage-gold focus:outline-none"
                      />
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-vintage-mahogany">
                    Email Address
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="shopper@example.com"
                      className="w-full rounded-lg border border-vintage-leather/30 bg-white px-3 py-2 pl-9 text-xs focus:border-vintage-gold focus:outline-none"
                    />
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-vintage-mahogany">
                    Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-vintage-leather/30 bg-white px-3 py-2 pl-9 text-xs focus:border-vintage-gold focus:outline-none"
                    />
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl border border-vintage-gold bg-vintage-gold py-2.5 text-xs font-bold text-vintage-deepMahogany shadow-brass transition hover:bg-vintage-antiqueGold"
                >
                  {isRegister ? 'Create Patron Account' : 'Sign In to Marketplace'}
                </button>
              </form>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-xs font-medium text-vintage-leather underline hover:text-vintage-mahogany"
                >
                  {isRegister ? 'Already registered? Sign in here' : "Need an account? Register as a patron"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
