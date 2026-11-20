import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CobbleCart | The Victorian Promenade & Multi-Store Price Verifier',
  description:
    'A Victorian shopping street marketplace comparing live prices across Flipkart, Amazon India, and specialty boutiques with a built-in GenAI Shopping Concierge.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="parchment-bg min-h-screen text-vintage-deepMahogany antialiased selection:bg-vintage-gold selection:text-vintage-deepMahogany">
        {children}
      </body>
    </html>
  );
}
