import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Offshore Support for Australian Advisers | Mint',
  description: 'Learn about Mint Business Solutions, the secure offshore subsidiary of Mint Financial Solutions Melbourne. Delivering expert advice administration from Sri Lanka.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | Offshore Support for Australian Advisers | Mint',
    description: 'Learn about Mint Business Solutions, the secure offshore subsidiary of Mint Financial Solutions Melbourne. Delivering expert advice administration from Sri Lanka.',
    url: 'https://mintfinancialsolutions.com.au/about',
    type: 'website',
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
