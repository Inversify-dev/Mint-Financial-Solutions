'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Briefcase, FileText, ArrowRight } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Manage window scroll behaviors
  useEffect(() => {
    const isHome = pathname === '/';

    const handleScroll = () => {
      if (!isHome) {
        setScrolled(true);
      } else {
        if (window.scrollY > 400) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };

    // Run once to set the initial state depending on page and active scroll
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Close menus on path changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks: { name: string; href: string; hasDropdown?: boolean }[] = [
    { name: 'Home', href: '/' },
    { name: 'Services & Sectors', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Insights', href: '/insights' },
  ];

  const servicesDropdown = [
    { name: 'Financial Planning Support', href: '/services?tab=financial-planning', desc: 'SOAs, SMSF prep, super & insurance.' },
    { name: 'Accounting & Bookkeeping', href: '/services?tab=accounting', desc: 'Tax planning accounts, general ledgers & BAS.' },
    { name: 'Mortgage Loan Processing', href: '/services?tab=mortgages', desc: 'Broker portal tracking, bank checks & settlement.' },
    { name: 'Property Management Support', href: '/services?tab=property', desc: 'Lease administration, reference checks & ledger logs.' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isHome = pathname === '/';

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-900 py-3 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo link */}
            <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-90">
              <Logo height={54} light={true} />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <button
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${isActive(link.href)
                            ? 'bg-white/10 text-white font-semibold'
                            : 'text-neutral-300 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        {link.name}
                        <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Desktop Dropdown content */}
                      <div
                        className={`absolute left-0 mt-1 w-80 bg-neutral-950 border border-neutral-900 shadow-2xl rounded-2xl py-3 z-50 transition-all duration-200 origin-top-left ${dropdownOpen
                            ? 'opacity-100 scale-100 pointer-events-auto'
                            : 'opacity-0 scale-95 pointer-events-none'
                          }`}
                      >
                        <div className="px-4 py-2 border-b border-neutral-900 mb-2">
                          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Our Capabilities</p>
                        </div>
                        {servicesDropdown.map((service) => (
                          <Link
                            key={service.name}
                            href={service.href}
                            className="flex gap-3 px-4 py-2.5 hover:bg-neutral-900 transition-colors rounded-xl mx-2"
                          >
                            <div className="mt-1 text-primary">
                              <FileText size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">{service.name}</p>
                              <p className="text-xs text-neutral-400 line-clamp-1">{service.desc}</p>
                            </div>
                          </Link>
                        ))}
                        <div className="mt-2 px-4 pt-2 border-t border-neutral-900 flex justify-end">
                          <Link
                            href="/services"
                            className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                          >
                            View all services <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${isActive(link.href)
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-neutral-300 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary-dark text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md shadow-primary/10 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-white hover:bg-white/10 focus:outline-none transition-colors"
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-950/60 backdrop-blur-[2px] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-neutral-950 border-l border-neutral-900 flex flex-col p-6 transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center mb-8">
          <Logo height={50} light={true} />
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl text-white hover:bg-neutral-900"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div key={link.name} className="flex flex-col gap-1">
                  <div className="px-4 py-2.5 text-base font-semibold text-white border-b border-neutral-900">
                    {link.name}
                  </div>
                  <div className="pl-4 flex flex-col gap-1 mt-1">
                    {servicesDropdown.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-xl"
                      >
                        {service.name}
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      className="px-4 py-2 text-sm text-primary font-bold hover:underline"
                    >
                      All Services
                    </Link>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-3 text-base font-semibold rounded-2xl transition-colors ${isActive(link.href)
                    ? 'bg-white/10 text-white'
                    : 'text-neutral-300 hover:bg-neutral-900'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto border-t border-neutral-900 pt-6 flex flex-col gap-3">
          <Link
            href="/contact"
            className="w-full bg-primary hover:bg-primary-dark text-white text-center font-bold py-3.5 rounded-2xl shadow-lg shadow-primary/10 transition-colors"
          >
            Get Started
          </Link>
          <a
            href="tel:+94718876743"
            className="w-full border border-neutral-800 text-white text-center font-semibold py-3.5 rounded-2xl hover:bg-neutral-900 transition-colors text-sm"
          >
            Call +94 71 887 6743
          </a>
        </div>
      </div>
    </>
  );
}
