'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, MessageSquare, X, Send } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [chatOpen, setChatOpen] = useState(false);

  const services = [
    { name: 'Paraplanning & Advice Support', href: '/services' },
    { name: 'Mortgage Loan Processing', href: '/services' },
    { name: 'Accounting & Bookkeeping', href: '/services' },
    { name: 'Property Management Admin', href: '/services' },
    { name: 'Business Administration', href: '/services' },
    { name: 'Client Support Services', href: '/services' },
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Latest Insights', href: '/insights' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-900/50 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">

          {/* Logo and About column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="inline-block hover:opacity-90">
              <Logo height={64} />
            </Link>
            <p className="text-sm text-charcoal-light leading-relaxed max-w-sm">
              Mint Business Solutions provides premium, compliant, and security-certified offshore support teams for Australian financial practices. We help firms unlock growth, optimize overheads, and scale client experiences.
            </p>

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

          {/* Company Navigation */}
          <div>
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

          {/* Contact column */}
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
                  <a href="mailto:enquiries@mintfinancialsolutions.com.au" className="text-sm text-charcoal-light hover:text-primary transition-colors font-medium break-all">
                    enquiries@mintfinancialsolutions.com.au
                  </a>
                </li>
              </ul>
            </div>
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

      {/* Interactive Floating Chat Widget with Mail & WhatsApp Options */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {chatOpen && (
          <div className="bg-white border border-neutral-200 shadow-2xl rounded-2xl p-4 w-64 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-100 mb-1">
              <span className="text-xs font-bold text-charcoal uppercase tracking-wider">Choose Service</span>
              <button
                onClick={() => setChatOpen(false)}
                className="text-neutral-400 hover:text-charcoal p-1 rounded-md"
              >
                <X size={14} />
              </button>
            </div>

            {/* Email Option */}
            <a
              href="mailto:enquiries@mintfinancialsolutions.com.au?subject=Inquiry%20via%20Website"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-50 hover:bg-primary/10 hover:text-primary transition-all text-xs font-semibold text-charcoal group"
              onClick={() => setChatOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <Mail size={16} />
              </div>
              <div className="flex flex-col">
                <span>Email Us</span>
                <span className="text-[10px] text-neutral-400 font-normal">Direct inbox message</span>
              </div>
            </a>

            {/* WhatsApp Option */}
            <a
              href="https://wa.me/94718876743?text=Hi%20Mint%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-50 hover:bg-emerald-50 hover:text-emerald-700 transition-all text-xs font-semibold text-charcoal group"
              onClick={() => setChatOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Send size={16} />
              </div>
              <div className="flex flex-col">
                <span>WhatsApp Us</span>
                <span className="text-[10px] text-neutral-400 font-normal">Instant WhatsApp chat</span>
              </div>
            </a>
          </div>
        )}

        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-primary hover:bg-primary-dark text-white font-bold text-xs py-3.5 px-6 rounded-full shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 border border-primary-light/20 cursor-pointer"
          aria-label="Let's Chat"
        >
          {chatOpen ? <X size={16} /> : <MessageSquare size={16} />}
          <span>{chatOpen ? 'Close Chat' : "Let's Chat"}</span>
        </button>
      </div>
    </footer>
  );
}
