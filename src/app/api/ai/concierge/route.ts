import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/products-data';
import { askShoppingConcierge } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body.query || '';

    if (!query.trim()) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const response = await askShoppingConcierge(query, PRODUCTS);
    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to process AI inquiry', details: err?.message },
      { status: 500 }
    );
  }
}
