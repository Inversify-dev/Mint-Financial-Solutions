import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Our Experts | Sri Lanka Financial Support Services | Mint',
  description: 'Connect with our Melbourne headquarters or Colombo operations center. Outsource your financial planning support and bookkeeping tasks today.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Our Experts | Sri Lanka Financial Support Services | Mint',
    description: 'Connect with our Melbourne headquarters or Colombo operations center. Outsource your financial planning support and bookkeeping tasks today.',
    url: 'https://mintfinancialsolutions.com.au/contact',
    type: 'website',
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
