'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, ShieldCheck, ArrowUpRight, MessageSquare } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Paraplanning & Advice Support', href: '/services' },
    { name: 'Mortgage Loan Processing', href: '/services' },
    { name: 'Accounting & Bookkeeping', href: '/services' },
    { name: 'Property Management Admin', href: '/services' },
    { name: 'Business Administration', href: '/services' },
    { name: 'Client Support Services', href: '/services' },
  ];

  const industries = [
    { name: 'Financial Advisers', href: '/industries#advisers' },
    { name: 'Mortgage Brokers', href: '/industries#brokers' },
    { name: 'Accounting Firms', href: '/industries#accounting' },
    { name: 'Property Businesses', href: '/industries#property' },
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Latest Insights', href: '/insights' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-900/50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">

          {/* Logo and About column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="inline-block hover:opacity-90">
              <Logo height={45} />
            </Link>
            <p className="text-sm text-charcoal-light leading-relaxed max-w-sm">
              Mint Business Solutions provides premium, compliant, and security-certified offshore support teams for Australian financial practices. We help firms unlock growth, optimize overheads, and scale client experiences.
            </p>
            {/* <div className="flex items-center gap-2 border border-primary/20 bg-accent-light/40 py-2.5 px-4 rounded-xl max-w-xs text-xs font-semibold text-charcoal">
              <ShieldCheck size={18} className="text-primary flex-shrink-0" />
              <span>Australian Data Security Standards (Privacy Act compliant)</span>
            </div> */}

            {/* Social media icons */}
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-charcoal-light hover:text-primary hover:border-primary transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-charcoal-light hover:text-primary hover:border-primary transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-charcoal-light hover:text-primary hover:border-primary transition-colors">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Services Navigation */}
          <div>
            <h3 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-5">Capabilities</h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-charcoal-light hover:text-primary hover:underline transition-colors flex items-center gap-0.5">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries / Company Navigation */}
          <div>
            {/* <h3 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-5">Industries</h3>
            <ul className="space-y-3 mb-8">
              {industries.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-charcoal-light hover:text-primary hover:underline transition-colors flex items-center gap-0.5">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul> */}

            <h3 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-5">Company</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-charcoal-light hover:text-primary hover:underline transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact and Newsletter column */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-xs font-bold text-charcoal uppercase tracking-widest mb-5">Get in Touch</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-2.5">
                  <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-charcoal-light">
                    <p className="font-semibold text-charcoal">Colombo Operations:</p>
                    <p>46a S. De S. Jayasinghe Mawatha,</p>
                    <p>Colombo 10350, Sri Lanka</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-charcoal-light flex flex-col gap-1">
                    <a href="tel:+94718876743" className="hover:text-primary transition-colors font-medium">
                      +94 71 887 6743 (Colombo)
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={16} className="text-primary flex-shrink-0" />
                  <a href="mailto:enquiries@mintfinancialsolutions.com.au" className="text-sm text-charcoal-light hover:text-primary transition-colors font-medium">
                    enquiries@mintfinancialsolutions.com.au
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter form mockup */}
            {/* <div className="border border-neutral-100 dark:border-neutral-800 p-4 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm mt-2">
              <p className="text-xs font-bold text-charcoal mb-2">Subscribe to Insights</p>
              <p className="text-[11px] text-charcoal-light mb-3">Get advice regulatory alerts and BPO strategies.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-neutral-50 border border-neutral-200 text-xs px-3 py-2 rounded-xl flex-1 focus:outline-none focus:border-primary text-charcoal"
                  required
                />
                <button type="submit" className="bg-primary hover:bg-primary-dark text-white p-2 rounded-xl flex items-center justify-center transition-colors">
                  <ArrowUpRight size={14} />
                </button>
              </form>
            </div> */}
          </div>
        </div>

        {/* Bottom footer bar */}
        <div className="border-t border-neutral-200/60 dark:border-neutral-800/60 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-charcoal-light">
          <p>© {currentYear} Mint B2B Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Data Protection</a>
          </div>
          <p className="text-[10px] text-neutral-400">
            Mint Business Solutions Private Limited is a fully owned subsidiary of Mint Financial Solutions Pty Ltd Melbourne, Australia. All logos and trademarks are properties of their respective owners.
          </p>
        </div>
      </div>

      {/* Floating Let's Chat Button (Email Trigger Aligned to Client Feedback) */}
      <a
        href="mailto:enquiries@mintfinancialsolutions.com.au?subject=Let's%20Chat"
        className="fixed bottom-6 right-6 z-40 bg-primary hover:bg-primary-dark text-white font-bold text-xs py-3.5 px-6 rounded-full shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 border border-primary-light/20"
        aria-label="Let's Chat"
      >
        <MessageSquare size={16} />
        <span>Let&apos;s Chat</span>
      </a>
    </footer>
  );
}
