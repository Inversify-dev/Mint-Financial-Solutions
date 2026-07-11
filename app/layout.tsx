import React from 'react';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Australian Paraplanning & Offshore Financial Support | Mint',
  description: 'Secure, APP-compliant offshore back-office support for Australian financial advisers, mortgage brokers, and accountants. Certified operations based in Sri Lanka.',
  metadataBase: new URL('https://mintfinancialsolutions.com.au'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Australian Paraplanning & Offshore Financial Support | Mint',
    description: 'Secure, APP-compliant offshore back-office support for Australian financial advisers, mortgage brokers, and accountants. Certified operations based in Sri Lanka.',
    url: 'https://mintfinancialsolutions.com.au',
    siteName: 'Mint Financial Solutions',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Mint Business Solutions Professional Support Team Office',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Australian Paraplanning & Offshore Financial Support | Mint',
    description: 'Secure, APP-compliant offshore back-office support for Australian financial advisers, mortgage brokers, and accountants. Certified operations based in Sri Lanka.',
    images: ['https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org structured data markup
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'Mint Business Solutions Private Limited',
    'alternateName': 'Mint Business Solutions',
    'description': 'Premium offshore back-office and paraplanning support services for Australian financial advisers, mortgage brokers, and accountants.',
    'url': 'https://mintfinancialsolutions.com.au',
    'logo': 'https://mintfinancialsolutions.com.au/logo.png',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '46a S. De S. Jayasinghe Mawatha',
      'addressLocality': 'Colombo',
      'postalCode': '10350',
      'addressCountry': 'LK',
    },
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': '+94 71 887 6743',
        'contactType': 'customer support',
        'areaServed': 'AU',
        'availableLanguage': 'English',
      },
      {
        '@type': 'ContactPoint',
        'telephone': '+94-71-887-6743',
        'contactType': 'operations office',
        'areaServed': 'LK',
        'availableLanguage': ['English', 'Sinhala'],
      },
    ],
    'sameAs': [
      'https://www.linkedin.com/company/mint-b2b-solutions',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Mint Business Solutions',
    'url': 'https://mintfinancialsolutions.com.au',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://mintfinancialsolutions.com.au/insights?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const jsonLd = [professionalServiceSchema, websiteSchema];

  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-white">
        <Navbar />
        {/* Main wrapper offset for floating sticky Navbar */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}