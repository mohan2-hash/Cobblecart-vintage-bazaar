# 🏛️ CobbleCart | The Victorian Promenade & AI Deal Aggregator

[![CI Build](https://github.com/your-username/cobblecart-vintage-bazaar/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/cobblecart-vintage-bazaar)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Google%20Gemini-1.5%20Flash-orange?logo=google)](https://deepmind.google/technologies/gemini/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> An immersive full-stack e-commerce marketplace featuring a **Victorian Shopping Street** desktop aesthetic, a **multi-store real-time price comparison engine** (comparing Flipkart, Amazon India, Croma, and Boutiques), and an integrated **GenAI Shopping Concierge & Review Sentiment Synthesizer**.

---

## 🌟 Key Highlights & Engineering Competencies

This project was architected from the ground up to showcase industry-grade mastery across multiple high-demand domains:

### 1. 🚀 Full-Stack Engineering
- **Modern Next.js 14 App Router & TypeScript**: Clean separation of Client and Server components, typed API routes, dynamic parameter routing (`/product/[id]`), and strict null checks.
- **Custom Design System & Atmospheric UI**: Handcrafted Victorian visual language with warm gaslight lanterns, amber glows, cobblestone textures, parchment backings, and typography—all while maintaining responsive mobile-first ergonomics.
- **Interactive State & Cart Management**: Real-time multi-filter queries (by category, merchant, price range, and rating), bookmarkable price-drop watchlists, and persistent user sessions.

### 2. 🧠 GenAI & AI/ML Engineering
- **"Barnaby Sterling" — Conversational Deal Concierge**: Powered by Google's Gemini API with an intelligent persona prompt. Can answer complex multi-store comparison questions like *"Where is the Sony WH-1000XM5 cheapest right now and will the price drop soon?"*
- **Cross-Store Review Sentiment Synthesizer**: Analyzes thousands of buyer reviews from both Flipkart and Amazon, isolating key product strengths, reported drawbacks, and a "Buy Now vs. Wait" verdict.
- **Price Trend & Volatility Model**: Calculates 30-day historical pricing movements and generates a statistical percentage probability of near-term price drops.

### 3. ⚖️ Multi-Store Arbitrage & Redirection
- **Automated Price Comparator**: Compares price points between Flipkart, Amazon, Croma, and Official Boutiques.
- **Arbitrage Savings Calculator**: Highlights exact rupee savings (e.g., *"Save ₹5,600 on Flipkart"* or *"Save ₹5,000 on Amazon"*).
- **Dual Outbound Protocol**:
  1. Direct outbound affiliate redirection to the official merchant site.
  2. One-click simulated Victorian parchment dispatch invoice for instant order verification.

---

## 🏛️ System Architecture

```mermaid
flowchart TD
    User["👤 Patron / Shopper"] --> Web["🖥️ Next.js 14 Promenade Frontend\n(Victorian Street / Gaslight UI)"]
    
    subgraph Core ["Application Core"]
        Web --> Search["🔍 Live Search & Filter Engine"]
        Web --> Comp["⚖️ Multi-Store Price Comparator\n(Flipkart vs Amazon vs Croma)"]
        Web --> AI["🎩 Barnaby Sterling AI Drawer\n(Gemini GenAI Concierge)"]
    end
    
    subgraph Data ["Data & Services"]
        Comp --> Catalog["📦 Unified Catalog Repository\n(Products, Specs, Reviews)"]
        AI --> Gemini["✨ Google Gemini API\n(1.5 Flash Model)"]
        AI --> Sentiment["📊 Review Sentiment & Pros/Cons Analyzer"]
    end
    
    subgraph Checkout ["Outbound Dispatch"]
        Comp --> Redirect["🚀 Merchant Redirection Modal"]
        Redirect --> Amazon["🛒 Amazon India Checkout"]
        Redirect --> Flipkart["📦 Flipkart Checkout"]
        Redirect --> Invoice["📜 Simulated Victorian Dispatch Docket"]
    end
```

---

## 🛍️ Promenade Stalls (Categories)

| Storefront Façade | Category | Example Featured Wares |
| :--- | :--- | :--- |
| **The Edison Electric Guild** | Electronics & Computing | Apple MacBook Air M3, Mechanical Keyboards |
| **The Gramophone & Valve Works** | Audio & Hi-Fi Acoustics | Sony WH-1000XM5 ANC, Pro-Ject Walnut Turntable |
| **Crown & Escapement Horologists** | Mechanical Horology | Tissot Heritage Visodate Powermatic 80 |
| **Savile Row Heritage Clothiers** | Bespoke Fashion | Harris Tweed Victorian Herringbone Overcoat |
| **The Antiquarian Scriptorium** | Classic Books & Stationery | Parker Duofold Centennial 18k Gold Fountain Pen |
| **Victorian Foundry & Home Goods** | Home Decor & Hardware | Solid Cast Brass Banker's Lamp with Emerald Glass |

---

## 🛠️ Tech Stack Breakdown

- **Framework**: [Next.js 14](https://nextjs.org/) (React 18, TypeScript)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with custom Victorian color palettes (`#FAF5E9` parchment, `#C59B27` brass, `#2C1810` mahogany)
- **AI Integration**: [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) (Google Gemini 1.5 Flash) with fallback heuristic AI engine
- **Icons**: [Lucide React](https://lucide.dev/)
- **Micro-Interactions**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **CI/CD**: GitHub Actions automated typecheck and build workflow

---

## ⚡ Quickstart Guide

### 1. Prerequisites
Ensure you have **Node.js 18+** installed:
```bash
node -v
npm -v
```

### 2. Clone and Install
```bash
git clone https://github.com/your-username/cobblecart-vintage-bazaar.git
cd cobblecart-vintage-bazaar
npm install
```

### 3. Configure Gemini AI (Optional)
The project includes a built-in heuristic AI fallback that works 100% out of the box without any API keys. If you want to connect live Google Gemini API:
```bash
cp .env.example .env.local
# Add your key to .env.local:
# GEMINI_API_KEY=your_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to stroll the Victorian Promenade!

### 5. Production Build
```bash
npm run build
npm start
```

---

## 🧑‍💻 Quick Test Profiles for Reviewers

When testing the authentication and user portal, click **"Sign In"** in the top navigation bar to access one-click reviewer profiles:
- **Arthur Pendelton (Dev Profile)**: `arthur.dev@cobblecart.com`
- **Lady Eleanor Vance (Collector Profile)**: `eleanor@cobblecart.com`

---

## 🌐 Deploying to Vercel (1-Click)

This project is fully optimized for zero-config Vercel deployment:
1. Push this repository to your GitHub account.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository and click **Deploy**.
4. (Optional) Add your `GEMINI_API_KEY` under Environment Variables.

---

## 📄 License
Distributed under the **MIT License**. See `LICENSE` for more information.
