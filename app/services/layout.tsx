import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Australian Paraplanning Services & Mortgage Processing | Mint',
  description: 'Scale your practice with our Australian paraplanning services, mortgage loan processing, and bookkeeping outsourcing. Secure, compliant support from Sri Lanka.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Australian Paraplanning Services & Mortgage Processing | Mint',
    description: 'Scale your practice with our Australian paraplanning services, mortgage loan processing, and bookkeeping outsourcing. Secure, compliant support from Sri Lanka.',
    url: 'https://mintfinancialsolutions.com.au/services',
    type: 'website',
  }
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
