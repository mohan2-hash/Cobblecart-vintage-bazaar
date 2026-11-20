import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/products-data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search')?.toLowerCase();
  const store = searchParams.get('store');
  const sort = searchParams.get('sort');

  let results = [...PRODUCTS];

  if (category && category !== 'all') {
    results = results.filter((p) => p.category === category);
  }

  if (search) {
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
    );
  }

  if (store && store !== 'all') {
    results = results.filter((p) => p.storePrices.some((s) => s.store.toLowerCase() === store.toLowerCase()));
  }

  if (sort === 'price-low') {
    results.sort((a, b) => {
      const minA = Math.min(...a.storePrices.map((s) => s.price));
      const minB = Math.min(...b.storePrices.map((s) => s.price));
      return minA - minB;
    });
  } else if (sort === 'price-high') {
    results.sort((a, b) => {
      const minA = Math.min(...a.storePrices.map((s) => s.price));
      const minB = Math.min(...b.storePrices.map((s) => s.price));
      return minB - minA;
    });
  } else if (sort === 'rating') {
    results.sort((a, b) => b.overallRating - a.overallRating);
  }

  return NextResponse.json({
    total: results.length,
    products: results,
  });
}
