'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, ShieldCheck, Shield, Zap, Users, FileText, TrendingUp, Percent, Home, Briefcase, MessageSquare } from 'lucide-react';

const diagnosticRoles = [
  {
    id: 'planner',
    role: 'Financial Planner / Practice Manager',
    question: 'How much time does your practice lose on advice preparation and modeling?',
    timeLost: '12 - 16 hours per plan',
    solutionMetric: 'Save 15+ hours per client advice folder',
    painPoint: 'Spending client-facing days drafting calculations, comparing super funds, and filling compliance checklists instead of building trust.',
    solution: 'Our trained paraplanning assistants execute modeling, retrieve insurance comparison quotes, and format draft advice documents in your secure Australian server logs.',
    link: '/contact?service=financial-planning'
  },
  {
    id: 'broker',
    role: 'Mortgage Broker',
    question: 'Is application data entry and bank follow-up clogging your sales pipeline?',
    timeLost: '8 - 10 hours per loan',
    solutionMetric: 'Save 6+ hours per loan file',
    painPoint: 'Manually uploading bank files, typing application details in portal systems, and chasing valuation updates daily.',
    solution: 'Our lending assistants input data directly into your loan CRM, order bank property valuations, verify document checklists, and schedule settlement appointments.',
    link: '/contact?service=mortgages'
  },
  {
    id: 'accountant',
    role: 'Accountant / Tax Practitioner',
    question: 'Are junior compliance folders and ledger reconciliations piling up?',
    timeLost: '15 - 20 hours per week',
    solutionMetric: 'Save 12+ hours per ledger client',
    painPoint: 'Spending premium billable partner hours updating basic books, logging payroll logs, and checking SMSF compliance documents.',
    solution: 'Our accounting support assistants coordinate daily bank matching logs, update cloud tax ledgers, and index paper records for easy compliance verification.',
    link: '/contact?service=accounting'
  },
  {
    id: 'property',
    role: 'Real Estate Agency',
    question: 'Are your property managers overwhelmed by database desk administration?',
    timeLost: '10 - 12 hours per week',
    solutionMetric: 'Save 8+ hours per listing cycle',
    painPoint: 'Drafting lease agreements, dialing applicant tenancy check references, and updating listing pictures instead of showing properties.',
    solution: 'Our real estate admin assistants verify applicant paperwork, draft lease renewals, register maintenance logs, and manage listings across property portals.',
    link: '/contact?service=property-management'
  }
];

const capabilities = [
  {
    id: 'financial-planning',
    title: 'Financial Planning & Advice Administration',
    subDesc: 'Complete paraplanning and advice log assistance for Australian advisors.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    fullDesc: 'We help advisers prepare Statement of Advice (SoA) and Record of Advice (RoA) documents. Our Colombo staff logs directly into your planning system using secure Australian VDI protocols, processing comparisons, calculating investment models, and filling checklist compliance steps.',
    deliverables: [
      'End-to-end draft advice document formatting',
      'Superannuation fee comparisons and fund performance tables',
      'Retirement and insurance quote modeling checks',
      'Client file notes matching and database compliance logs',
      'Annual advice review letter preparation and scheduling'
    ],
    tools: ['Advice Databases', 'Planning Software', 'Comparison Tools'],
    href: '/contact?service=financial-planning'
  },
  {
    id: 'accounting',
    title: 'Accounting, Bookkeeping & SMSF Administration',
    subDesc: 'Daily transaction updates, reconciliations, and compliance support audits.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    fullDesc: 'We take over repetitive cloud ledger indexing, daily bookkeeping entries, and data organization. We prepare company financial statement folders, update ledger accounts, and help assemble compliance logs for tax return filing.',
    deliverables: [
      'Daily bank statement matches and ledger updates',
      'Receipt logging and supplier account payouts checks',
      'SMSF annual compliance folder sorting and bookkeeping',
      'Company files preparation and corporate registry logging',
      'Payroll administration reporting checks'
    ],
    tools: ['Cloud Accounting Tools', 'Secure Ledger Portals', 'Data Hubs'],
    href: '/contact?service=accounting'
  },
  {
    id: 'mortgages',
    title: 'Lending & Mortgage Broker Pipeline Support',
    subDesc: 'Coordinating loan files, checking document packages, and booking settlements.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
    fullDesc: 'Keep your broker focus on writing deals. Our support specialists handle loan data entries, check broker CRM pipelines, track property valuation status, and communicate directly with bank check units to clear queries.',
    deliverables: [
      'Broker CRM pipeline entries and compliance checks',
      'Collating bank statement logs and credit check documents',
      'Property valuations ordering and status reporting',
      'Bank processing update logs and settlement bookings',
      'Commission register matches and trail report logging'
    ],
    tools: ['Broker CRM Portals', 'Lender Loan Portals', 'Valuation Portals'],
    href: '/contact?service=mortgages'
  },
  {
    id: 'property',
    title: 'Property Management & Agency Admin',
    subDesc: 'Tenancy verification audits, listing updates, and landlord portal log maintenance.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80',
    fullDesc: 'Free your property managers from administrative backlogs. Our Colombo team handles routine lease draft updates, candidate reference logs, maintenance ticket records, and database listing syncs.',
    deliverables: [
      'Lease renewal drafts and rental agreement updates',
      'Tenancy applicant reference calls and audit checklists',
      'Maintenance service request logs and supplier bookings',
      'Utility connection entries and rent ledger logs',
      'Real estate portal listing updates and photography formatting'
    ],
    tools: ['Property Portals', 'Office Databases', 'Rental Systems'],
    href: '/contact?service=property-management'
  },
  {
    id: 'insurance-estate',
    title: 'Insurance, Estate & Business Admin',
    subDesc: 'Estate planning logging, quote collation, and corporate database syncs.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    fullDesc: 'We assist with administrative steps for estate management and business succession plans. Our team updates client CRM profiles, coordinates quotes from multiple insurance providers, and structures documentation records.',
    deliverables: [
      'Personal and business insurance quotes research and collation',
      'Estate planning document data entry and archiving logs',
      'Practice database audits and duplicate cleanup campaigns',
      'Client appointment reminders and document follow-ups'
    ],
    tools: ['Estate Planning Logs', 'Insurance Quote Hubs', 'Practice CRMs'],
    href: '/contact?service=financial-planning'
  }
];

const targetSectors = [
  {
    label: 'Melbourne & Interstate Partners',
    title: 'Financial Planning Practices',
    desc: 'Our Colombo-based support team integrates directly with your advice workflow, preparing documentation and modeling that helps you scale your review meeting volume.',
    advantages: [
      'Dedicated paraplanning specialists and documentation support',
      'Adherence to strict onshore advisory timelines',
      'Full compliance checkpoints configured by your team'
    ],
    href: '/contact?service=financial-planning',
    btnText: 'Enquire for Financial'
  },
  {
    label: 'Ledger Scale & SMSF Admin',
    title: 'Accounting & Tax Firms',
    desc: 'Say goodbye to seasonal bottlenecks. We handle routine data formatting, payroll admin checking, and SMSF bookkeeping to let partners focus on proactive planning advisory.',
    advantages: [
      'Highly qualified commerce and accounting support graduates',
      'Year-round support for smooth data flows during peaks',
      'Precise document matching systems for auditor reviews'
    ],
    href: '/contact?service=accounting',
    btnText: 'Enquire for Accounting'
  },
  {
    label: 'Lending Pipeline Experts',
    title: 'Mortgage Brokerages',
    desc: 'Increase your monthly settlement numbers. Our loan admin assistants manage lender portals, process data entry, and schedule settlements.',
    advantages: [
      'Fast response application uploads and file checks',
      'Clear visibility updates sent directly to your broker team',
      'Commission tracking matching logs'
    ],
    href: '/contact?service=mortgages',
    btnText: 'Enquire for Mortgage'
  },
  {
    label: 'Property Administration',
    title: 'Real Estate & Agency Groups',
    desc: 'Keep your property team on the road showing houses. We handle tenancy check logs, maintenance tickets, and portal listing maintenance.',
    advantages: [
      'Prompt candidate reference checklist compilation',
      'Database uploads and listing updates',
      'Organized rental database matching'
    ],
    href: '/contact?service=property-management',
    btnText: 'Enquire for Real'
  }
];

const marqueeItems = [
  "SUPERANNUATION COMPARISON CHECKS",
  "MORTGAGE APPLICATION DATA ENTRY",
  "CLOUD BOOKS UPDATES & RECONCILIATIONS",
  "TENANCY VERIFICATION CALL LOGS"
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<'capabilities' | 'sectors'>('capabilities');
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<string>('planner');

  const servicesSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Australian Paraplanning Services',
      'description': 'Compliant, APP-aligned paraplanning, advice documentation preparation, and superannuation modeling support for Australian Financial Advisers.',
      'provider': {
        '@type': 'ProfessionalService',
        'name': 'Mint Business Solutions Private Limited',
        'url': 'https://mintfinancialsolutions.com.au'
      },
      'areaServed': 'AU'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Mortgage Processing Support',
      'description': 'End-to-end loan tracking, bank communications, documentation updates, and settlement scheduling for Australian Mortgage Brokers.',
      'provider': {
        '@type': 'ProfessionalService',
        'name': 'Mint Business Solutions Private Limited',
        'url': 'https://mintfinancialsolutions.com.au'
      },
      'areaServed': 'AU'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Accounting, Bookkeeping & SMSF Outsourcing',
      'description': 'Reconciliations, transaction updates, BAS compilation folders, and corporate registry maintenance for Australian Accounting Firms.',
      'provider': {
        '@type': 'ProfessionalService',
        'name': 'Mint Business Solutions Private Limited',
        'url': 'https://mintfinancialsolutions.com.au'
      },
      'areaServed': 'AU'
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-charcoal relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      {/* PERFECT GRADIENT BLEND: Deep Soft Green Glow wash leaking strictly from the top right */}
      <div className="absolute top-[-10%] right-[-5%] w-[65vw] h-[65vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(138,194,61,0.09)_0%,rgba(138,194,61,0.03)_45%,transparent_70%)] pointer-events-none blur-3xl z-0" />

      {/* FULL DESKTOP VIEWPORT HERO CANVAS SECTION */}
      <section className="min-h-[85vh] lg:min-h-screen w-full flex flex-col justify-center items-center relative z-10 pt-32 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">

        {/* EDITORIAL HERO TEXT CONTAINER */}
        <div className="w-full max-w-[1000px] text-center flex flex-col items-center animate-fade-in-up">

          {/* Mint Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full border border-primary/20 bg-accent-light text-[11px] font-bold tracking-[0.18em] text-primary-dark uppercase">
              ✨ Mint Capabilities
            </span>
          </div>

          {/* PIXEL PERFECT TYPOGRAPHY AND GRADIENT: Tight tracking, impactful scales */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[60px] font-bold tracking-[-0.03em] leading-[1.08] font-display text-charcoal-dark mb-8 select-none">
            Practice Support{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-charcoal-dark via-charcoal-dark via-[65%] to-primary">
              Capabilities
            </span>{' '}
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-charcoal-dark via-charcoal via-[45%] to-primary-dark">
              & Sectors
            </span>
          </h1>

          {/* Larger font size copy text */}
          <p className="text-sm sm:text-base md:text-lg text-charcoal-light/90 max-w-[820px] font-normal leading-[1.75] mx-auto tracking-normal">
            We operate as the secure Colombo operational hub for Australian finance practices. We
            do not use complex systems or make decisions—we simply process your everyday
            administrative tasks to free up your local team.
          </p>
        </div>

        {/* DESIGNER EMBEDDED LONG CAPSULE PILL SLIDER CONTAINER */}
        <div className="w-full max-w-[1140px] mt-20 lg:mt-24">
          <div className="bg-white border border-neutral-100/90 shadow-[0_10px_40px_rgba(0,0,0,0.02)] rounded-full py-4 sm:py-5 px-6 sm:px-10 overflow-hidden relative w-full">
            <motion.div
              className="flex gap-20 whitespace-nowrap min-w-full items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 28, repeat: Infinity }}
            >
              {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3.5 text-[11px] font-bold text-charcoal-light/50 uppercase tracking-[0.22em] font-sans">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </section>

      {/* CORE WRAPPER CONTENT SEGMENT */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pb-36">

        {/* SECTION DIVIDER */}
        <div className="w-full mb-12">
          <hr className="border-t border-neutral-200 w-full" />
        </div>

        {/* INTERACTIVE DIAGNOSTIC SECTOR GRID */}
        <div className="mb-40 pt-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display text-charcoal-dark mb-4">
              Where is your practice losing time today?
            </h2>
            <p className="text-sm text-charcoal-light font-light leading-relaxed">
              Select your practice sector below to diagnose your back-office bottlenecks and view our tailored Colombo solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-[1140px] mx-auto">
            {/* Action Selectors Row */}
            <div className="lg:col-span-4 flex flex-col gap-3.5">
              {diagnosticRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedDiagnostic(role.id)}
                  className={`text-left p-6 rounded-xl border transition-all duration-300 relative flex items-center justify-between group cursor-pointer ${selectedDiagnostic === role.id
                    ? 'bg-white border-primary shadow-sm'
                    : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm/40'
                    }`}
                >
                  <div className="flex-grow pr-4">
                    <p className={`text-[9px] font-bold uppercase tracking-wider mb-1.5 transition-colors ${selectedDiagnostic === role.id ? 'text-primary' : 'text-charcoal-light/50'}`}>
                      Practice Type
                    </p>
                    <p className="text-sm sm:text-[15px] font-semibold text-charcoal-dark font-display">{role.role}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-4 h-4 transition-all duration-300 ${selectedDiagnostic === role.id ? 'text-primary translate-x-0.5' : 'text-neutral-300 group-hover:text-neutral-400'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            {/* Diagnostic Details Canvas */}
            <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-[32px] p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[420px] transition-all">
              {(() => {
                const current = diagnosticRoles.find(r => r.id === selectedDiagnostic) || diagnosticRoles[0];
                return (
                  <div className="space-y-8 flex-grow flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center gap-4">
                        <span className="text-[10px] font-bold text-red-500 bg-red-50 border border-red-100 px-3.5 py-1 rounded-full uppercase tracking-wider">
                          Estimated Time Sink
                        </span>
                      </div>

                      <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-charcoal-dark font-display leading-snug">
                        {current.question}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-neutral-100 text-sm leading-relaxed">
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-sans">Bottleneck Metrics</p>
                          <p className="text-xl sm:text-2xl font-bold text-charcoal-dark font-display">{current.timeLost}</p>
                          <p className="text-charcoal-light mt-3 font-light leading-relaxed">{current.painPoint}</p>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-bold text-primary uppercase tracking-wider font-sans">Mint Support Solution</p>
                          <p className="text-xl sm:text-2xl font-bold text-primary font-display">{current.solutionMetric}</p>
                          <p className="text-charcoal mt-3 font-light leading-relaxed">{current.solution}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-neutral-100 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm text-charcoal-light/60 font-light">
                        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        100% compliant with your local office rules
                      </div>
                      <Link href={current.link} className="w-full sm:w-auto">
                        <span className="bg-primary hover:bg-primary-dark text-white font-semibold pl-6 pr-2.5 py-2.5 rounded-full text-xs transition-colors flex items-center justify-between sm:justify-start gap-3 shadow-sm cursor-pointer tracking-wide group">
                          Explore this Capability
                          <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-primary transition-transform group-hover:translate-x-0.5">
                            <ArrowRight size={14} className="stroke-[3]" />
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* CENTRAL VIEW SEGMENT TOGGLES */}
        <div className="flex justify-center mb-20">
          <div className="bg-[#eff3ea] border border-neutral-200/60 p-1.5 rounded-full flex gap-1 shadow-inner">
            <button
              onClick={() => setActiveTab('capabilities')}
              className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'capabilities'
                ? 'bg-primary text-white shadow-sm'
                : 'text-charcoal/60 hover:text-charcoal hover:bg-white/40'
                }`}
            >
              Core Capabilities
            </button>
            <button
              onClick={() => setActiveTab('sectors')}
              className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'sectors'
                ? 'bg-primary text-white shadow-sm'
                : 'text-charcoal/60 hover:text-charcoal hover:bg-white/40'
                }`}
            >
              Target Sectors
            </button>
          </div>
        </div>

        {/* CONTAINER CONDITIONAL DATA SLIDES */}
        <AnimatePresence mode="wait">
          {activeTab === 'capabilities' ? (
            <motion.div
              key="capabilities"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="space-y-16 max-w-[1140px] mx-auto"
            >
              {capabilities.map((cap) => {
                const IconComponent = {
                  'financial-planning': FileText,
                  'accounting': TrendingUp,
                  'mortgages': Percent,
                  'property': Home,
                  'insurance-estate': Briefcase,
                }[cap.id] || FileText;

                return (
                  <div
                    key={cap.id}
                    className="bg-white border border-neutral-200/85 rounded-[32px] p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.015)] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
                  >
                    <div className="lg:col-span-5 flex flex-col justify-between h-full">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-[#f4fbf0] border border-primary/20 flex items-center justify-center mb-6">
                          <IconComponent className="text-primary w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-charcoal-dark font-display leading-tight mb-2">{cap.title}</h3>
                        <p className="text-charcoal-light font-light text-sm leading-relaxed mb-6">{cap.subDesc}</p>
                      </div>

                      <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-accent-light border border-neutral-100 shadow-inner mt-2">
                        <img
                          src={cap.image}
                          alt={cap.title}
                          className="w-full h-full object-cover transition-all duration-500"
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-7 flex flex-col justify-between text-sm h-full">
                      <p className="text-charcoal-light leading-relaxed font-light mb-6">{cap.fullDesc}</p>

                      <hr className="border-t border-neutral-100 my-6" />

                      <div>
                        <h4 className="text-[10px] font-bold text-charcoal-dark/50 uppercase tracking-wider mb-4">Supported Back-Office Tasks</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                          {cap.deliverables.map((item, dIdx) => (
                            <li key={dIdx} className="flex gap-2.5 items-start text-charcoal-light leading-relaxed font-light">
                              <span className="w-1.5 h-1.5 rounded-xs bg-primary flex-shrink-0 mt-2" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className="border-t border-neutral-100 my-6" />

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-2">
                        <div className="space-y-2">
                          <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Tools We Handle</p>
                          <div className="flex flex-wrap gap-1.5">
                            {cap.tools.map((tool, tIdx) => (
                              <span key={tIdx} className="text-[10px] font-medium text-charcoal-light bg-[#f9fafb] border border-neutral-200/80 px-2.5 py-1 rounded-md">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Link href={cap.href} className="w-full sm:w-auto self-end">
                          <span className="bg-primary hover:bg-primary-dark text-white font-semibold pl-6 pr-2.5 py-2.5 rounded-full text-xs transition-colors flex items-center justify-between sm:justify-start gap-3 shadow-sm cursor-pointer tracking-wide group whitespace-nowrap">
                            Get Setup Blueprint
                            <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-primary transition-transform group-hover:translate-x-0.5">
                              <ArrowRight size={14} className="stroke-[3]" />
                            </span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="sectors"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="space-y-12 max-w-[1140px] mx-auto"
            >
              <div className="bg-white border border-neutral-200 p-8 sm:p-12 rounded-[32px] max-w-[1140px] mx-auto shadow-[0_10px_35px_rgba(0,0,0,0.015)]">
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
                  <div className="w-12 h-12 rounded-xl bg-[#f4fbf0] border border-primary/20 flex items-center justify-center mb-4">
                    <ShieldCheck size={24} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal-dark font-display mb-2">
                    Direct Security Governance
                  </h3>
                  <p className="text-sm text-charcoal-light font-light leading-relaxed">
                    Operating as the direct Colombo branch of Mint Financial Solutions Australia, we run under identical security controls, matching Australian Privacy Principles (APPs).
                  </p>
                </div>

                <hr className="border-t border-neutral-100 my-8" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left text-xs leading-relaxed">
                  <div className="space-y-2">
                    <h4 className="font-bold text-charcoal-dark flex items-center gap-2 font-display text-sm">
                      <Shield size={16} className="text-primary flex-shrink-0" />
                      No Local Data Storage
                    </h4>
                    <p className="text-charcoal-light font-light leading-relaxed">
                      Staff log in directly via secure Australian VDI environments. No clipboard functions, email forwarding, or external drives.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-charcoal-dark flex items-center gap-2 font-display text-sm">
                      <Zap size={16} className="text-primary flex-shrink-0" />
                      Identical Operations
                    </h4>
                    <p className="text-charcoal-light font-light leading-relaxed">
                      Every task is mapped and audited against checklists configured directly by onshore advisory managers.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-charcoal-dark flex items-center gap-2 font-display text-sm">
                      <Home size={16} className="text-primary flex-shrink-0" />
                      Melbourne QA Oversight
                    </h4>
                    <p className="text-charcoal-light font-light leading-relaxed">
                      Completed work logs undergo peer reviews and are supervised by team leaders reporting daily to Melbourne.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1140px] mx-auto pt-4">
                {targetSectors.map((sector, idx) => {
                  const IconComponent = {
                    0: FileText,
                    1: TrendingUp,
                    2: Percent,
                    3: Home,
                  }[idx] || FileText;

                  return (
                    <div
                      key={idx}
                      className="bg-white border border-neutral-200 rounded-[28px] p-8 shadow-[0_10px_35px_rgba(0,0,0,0.015)] flex flex-col justify-between hover:border-neutral-300 transition-all text-sm group"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-lg bg-[#f4fbf0] border border-primary/20 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="text-primary w-5 h-5" />
                          </div>
                          <span className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-[#f4fbf0] text-[9px] font-bold tracking-wider text-primary uppercase">
                            {sector.label}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-charcoal-dark font-display mb-3">{sector.title}</h3>
                        <p className="text-charcoal-light leading-relaxed font-light mb-6">{sector.desc}</p>

                        <hr className="border-t border-neutral-100 my-5" />

                        <div className="mb-6">
                          <h4 className="text-[10px] font-bold text-charcoal-dark/50 uppercase tracking-wider mb-4">Operational Advantage</h4>
                          <ul className="space-y-3">
                            {sector.advantages.map((adv, aIdx) => (
                              <li key={aIdx} className="flex gap-2.5 items-start text-charcoal-light font-light leading-relaxed">
                                <CheckCircle size={15} className="text-primary flex-shrink-0 mt-0.5" />
                                <span>{adv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <hr className="border-t border-neutral-100 my-5" />
                        
                        <div className="flex justify-end">
                          <Link href={sector.href}>
                            <span className="bg-primary hover:bg-primary-dark text-white font-semibold pl-6 pr-2.5 py-2.5 rounded-full text-xs transition-colors flex items-center gap-3 shadow-sm cursor-pointer tracking-wide group/btn">
                              {sector.btnText}
                              <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-primary transition-transform group-hover/btn:translate-x-0.5">
                                <ArrowRight size={14} className="stroke-[3]" />
                              </span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* FLOATING LET'S CHAT ACTION BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/contact">
          <span className="bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-5.5 rounded-full shadow-[0_6px_20px_rgba(138,194,61,0.35)] hover:shadow-[0_8px_24px_rgba(138,194,61,0.5)] transition-all duration-300 flex items-center gap-2.5 cursor-pointer text-[11px] uppercase tracking-wider group hover:-translate-y-0.5">
            <MessageSquare size={15} className="text-white fill-transparent group-hover:scale-110 transition-transform" />
            Let's Chat
          </span>
        </Link>
      </div>

    </div>
  );
}