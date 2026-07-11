'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Zap,
  Award,
  Database,
  Users,
  Compass,
  CheckCircle,
  FileText,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import { BlogPost } from '../lib/cms';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HomePage() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/api/blog-posts?perPage=3')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((res) => {
        setLatestPosts(res.posts || []);
      })
      .catch((err: unknown) => {
        console.error('Failed to load latest posts:', err);
      });
  }, []);

  const stats = [
    { target: 12, suffix: '+', label: 'Years of Shared Excellence', desc: 'Partnering with Australian practices to deliver precise, high-performance back-office support.' },
    { target: 500, suffix: '+', label: 'Advice Files Processed', desc: 'Enabling onshore advisers, accountants, and brokers to focus on premium client relationships.' },
    { target: 30, suffix: '+', label: 'Accredited Specialists', desc: 'Universally qualified in Australian compliance standards, software systems, and workflows.' },
    { target: 100, suffix: '%', label: 'Security & APP Alignment', desc: 'Operating via secure onshore virtual desktop environments with zero local data storage.' }
  ];

  const features = [
    {
      icon: <Shield size={24} className="text-primary" />,
      title: 'Complete Privacy & APP Alignment',
      desc: 'We operate under strict Australian Privacy Principles. Client files remain in your secure onshore database via VDI, meaning zero data is stored locally.'
    },
    {
      icon: <Award size={24} className="text-primary" />,
      title: 'Universally Trained Specialists',
      desc: 'Our Colombo team consists of commerce and accounting graduates trained in Australian paraplanning, advice frameworks, taxation, and mortgage credit policies.'
    },
    {
      icon: <Zap size={24} className="text-primary" />,
      title: 'Direct Extension Branch Model',
      desc: 'We are not a third-party BPO vendor. Mint Colombo functions as a direct extension of our Melbourne headquarters under uniform operating procedures.'
    },
    {
      icon: <Users size={24} className="text-primary" />,
      title: 'Dual-Tier Quality Oversight',
      desc: 'All administration and compliance files undergo rigorous peer reviews and senior QA supervisor audits before release to the onshore team.'
    },
    {
      icon: <Compass size={24} className="text-primary" />,
      title: 'Scale Relationship Capacity',
      desc: 'By outsourcing repetitive documentation, fee checking, and portal management, advisers free up critical premium hours for client-facing growth.'
    },
    {
      icon: <CheckCircle size={24} className="text-primary" />,
      title: 'On-Site Physical & Digital Security',
      desc: 'Our operations centre features biometric access control, clean-desk policies, blocked USB ports, and restricted mobile device usage to guarantee data security.'
    }
  ];

  const coreServices = [
    {
      title: 'Financial Planning & Paraplanning',
      desc: 'Dedicated support for Statement of Advice (SoA) and Record of Advice (RoA) formatting, investment modeling, and fund performance comparison.',
      href: '/services?tab=financial-planning',
      icon: <FileText size={20} className="text-primary" />
    },
    {
      title: 'Accounting, Bookkeeping & SMSF',
      desc: 'Accurate daily bookkeeping ledger reconciliation, BAS preparation assistance, corporate registry logging, and annual SMSF compliance sorting.',
      href: '/services?tab=accounting',
      icon: <Database size={20} className="text-primary" />
    },
    {
      title: 'Mortgage Pipeline Support',
      desc: 'End-to-end loan tracking from submission to settlement, banking communication, credit check document collection, and settlement coordination.',
      href: '/services?tab=mortgages',
      icon: <TrendingUp size={20} className="text-primary" />
    }
  ];

  const industries = [
    { title: 'Financial Advisers', desc: 'We take care of superannuation analysis, pension calculations, and compliance forms so you can have more face-to-face review meetings.' },
    { title: 'Accounting Firms', desc: 'We help update client ledgers, manage tax returns preparation, reconcile statements, and prepare super fund audits.' },
    { title: 'Mortgage Brokers', desc: 'We handle loan tracking, bank communications, documents follow-ups, and settlement scheduling to help you write more loans.' },
    { title: 'Property Groups', desc: 'We coordinate tenancy check calls, draft lease updates, log maintenance requests, and manage rent registers.' }
  ];

  return (
    <div className="bg-white min-h-screen">

      {/* 1. HERO SECTION - High-Impact Fullscreen Image & Glass Overlay */}
      <section className="relative min-h-screen lg:h-screen lg:min-h-[750px] flex items-center justify-center overflow-hidden pt-24 pb-12 md:py-36 bg-neutral-950">

        {/* Fullscreen Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            alt="Corporate Tower Backdrop"
            className="w-full h-full object-cover object-center opacity-45 scale-105 animate-[float_20s_infinite_alternate]"
            style={{ animationDuration: '30s' }}
          />
          {/* Multi-stage premium gradient mask for crisp readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/10 via-transparent to-neutral-950" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20 md:pt-28">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl flex flex-col items-start text-left"
          >

            {/* Tagline */}
            {/* <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold text-primary mb-6 md:mb-8 shadow-2xl"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="tracking-widest uppercase text-xs">Australian Standards. Colombo Efficiencies.</span>
            </motion.div> */}

            {/* Title / Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display leading-[1.08] tracking-tight text-white mb-6 md:mb-8"
            >
              Scale Your Advisory. <br />
              <span className="text-primary">Powered by Premium Operations.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base lg:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-8 md:mb-12 font-medium"
            >
              Mint Business Solutions is the dedicated offshore operations branch of Mint Financial Solutions (Australia). Operating under strict compliance frameworks and direct Melbourne management, we empower Australian wealth, mortgage, and accounting practices to streamline back-office administration, advice document preparation, and ledger management.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4.5 rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/45 transition-all duration-300 text-center text-sm uppercase tracking-wider cursor-pointer"
                >
                  Book Discovery Session
                </motion.div>
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto"
              >
                <motion.div
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.12)" }}
                  whileTap={{ scale: 0.98 }}
                  className="border border-white/20 bg-white/5 text-white font-semibold px-8 py-4.5 rounded-xl transition-all duration-200 text-center text-sm backdrop-blur-sm uppercase tracking-wider cursor-pointer"
                >
                  Explore Capabilities
                </motion.div>
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 2. STATISTICS SECTION - Clean and tight (Dark themed to blend seamlessly with Hero) */}
      <section className="py-20 bg-neutral-950 border-b border-neutral-900 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center flex flex-col items-center">
                <p className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display text-primary mb-2">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </p>
                <p className="text-base font-bold text-white mb-2">{stat.label}</p>
                <p className="text-sm text-neutral-400 leading-relaxed max-w-[240px]">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES */}
      <section className="py-24 bg-[#fafbfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-charcoal mt-3 mb-4">
              Our Main Support Areas
            </h2>
            <p className="text-sm sm:text-base text-charcoal-light leading-relaxed max-w-xl mx-auto">
              Our Colombo team is trained to manage daily office work, working securely inside your existing online databases and software tools.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {coreServices.map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white border border-neutral-200/50 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F6F9F5] flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-3 font-display">{service.title}</h3>
                  <p className="text-sm text-charcoal-light leading-relaxed mb-6">{service.desc}</p>
                </div>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline group"
                >
                  Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-sm font-bold text-charcoal hover:text-primary transition-colors border-b border-charcoal/20 pb-0.5 hover:border-primary/40"
            >
              See all integrated capabilities <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. GOVERNANCE & PRIVACY COMPLIANCE */}
      <section className="py-24 bg-white border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest font-display">Governance</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-charcoal mt-3 mb-4">
              Direct-Extension Branch Model
            </h2>
            <p className="text-sm sm:text-base text-charcoal-light leading-relaxed max-w-xl mx-auto">
              We are not a third-party BPO vendor. Mint Colombo is a secure branch office of Mint Financial Solutions Australia, providing absolute continuity and security.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="border border-neutral-100 p-6 sm:p-8 rounded-2xl bg-[#fafbfa]/40 hover:bg-[#fafbfa]/80 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F6F9F5] flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-charcoal mb-2 font-display">{feature.title}</h3>
                <p className="text-sm text-charcoal-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. INDUSTRIES WE SERVE */}
      <section className="py-24 bg-[#fafbfa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex flex-col gap-6 items-start"
            >
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Sectors</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-charcoal leading-tight">
                Designed to Support Onshore Practices
              </h2>
              <p className="text-sm text-charcoal-light leading-relaxed">
                Our support structures align with standard compliance schemas and operations across Australian financial planning, accounting, and real estate businesses.
              </p>
              <div className="mt-2">
                <Link href="/services">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3.5 rounded-xl shadow-md shadow-primary/10 transition-colors inline-block text-sm cursor-pointer"
                  >
                    View Services & Sectors
                  </motion.div>
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {industries.map((ind, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white border border-neutral-200/50 p-6 rounded-3xl shadow-sm hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#F6F9F5] flex items-center justify-center mb-4 text-sm font-bold text-primary font-display">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-charcoal mb-2 font-display">{ind.title}</h3>
                  <p className="text-sm text-charcoal-light leading-relaxed">{ind.desc}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-charcoal mt-3 mb-4">
              Integrated Practice Feedback
            </h2>
            <p className="text-sm sm:text-base text-charcoal-light leading-relaxed max-w-xl mx-auto">
              Read how our parent practice and partners have scaled compliance and back-office operations using our Colombo-based branch.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-[#fafbfa]/40 border border-neutral-100 p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
            >
              <p className="text-sm sm:text-base text-charcoal-light leading-relaxed italic mb-6 font-normal">
                {"\"Our advice preparation bottleneck was sitting at six weeks, preventing us from scaling client reviews. Partnering with Mint's Colombo branch completely resolved this constraint. Their paraplanners deliver advice documents that align perfectly with our internal quality metrics.\""}
              </p>
              <div>
                <p className="text-sm font-bold text-charcoal font-display">Marcus Vance</p>
                <p className="text-xs text-neutral-400">Principal Adviser, Vance Wealth (Sydney)</p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-[#fafbfa]/40 border border-neutral-100 p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
            >
              <p className="text-sm sm:text-base text-charcoal-light leading-relaxed italic mb-6 font-normal">
                {"\"With broker pipelines expanding, our team was losing valuable sales time chasing lender updates. Mint's mortgage processing specialists stepped in to manage the administrative pipeline. We have achieved a 40% increase in settlement volumes.\""}
              </p>
              <div>
                <p className="text-sm font-bold text-charcoal font-display">Clara Peterson</p>
                <p className="text-xs text-neutral-400">Managing Director, Horizon Credit (Melbourne)</p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-[#fafbfa]/40 border border-neutral-100 p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
            >
              <p className="text-sm sm:text-base text-charcoal-light leading-relaxed italic mb-6 font-normal">
                {"\"Security was our paramount concern when exploring offshore accounting support. Mint Colombo operates directly within our secure Australian-hosted environments. The accuracy of their daily ledgers and tax folders is exceptional.\""}
              </p>
              <div>
                <p className="text-sm font-bold text-charcoal font-display">Simon Patel</p>
                <p className="text-xs text-neutral-400">Senior Partner, Patel & Co Tax Advisory (Brisbane)</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7. LATEST INSIGHTS FEED */}
      <section className="py-24 bg-[#fafbfa]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Resources</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-charcoal mt-3">
                Insights & Practice Operations
              </h2>
            </div>
            <Link
              href="/insights"
              className="text-sm font-bold text-primary flex items-center gap-1 hover:underline mt-4 sm:mt-0"
            >
              See all articles <ArrowRight size={14} />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {latestPosts.map((post: BlogPost) => (
              <motion.article
                key={post.id}
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white border border-neutral-200/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-neutral-100 overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-xs font-bold text-primary uppercase tracking-wider">
                      <span>{post.categories[0]}</span>
                      <span>•</span>
                      <span className="text-neutral-400 font-semibold">{post.readingTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-charcoal mb-2 line-clamp-2 hover:text-primary transition-colors font-display">
                      <Link href={`/insights/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-sm text-charcoal-light line-clamp-2 leading-relaxed">{post.excerpt}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-0 border-t border-neutral-50 mt-4 flex items-center gap-3">
                  {/* <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  /> */}
                  <div className="text-xs">
                    <p className="font-semibold text-charcoal">{post.author.name}</p>
                    <p className="text-neutral-400 text-[11px]">{post.date}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. CONVERSION CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#1e2229] text-white p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden text-center"
          >

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight mb-4">
                Partner with a Secure Melbourne-Managed Branch
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-8">
                Discover how our Colombo operations centre can handle time-consuming administration and enable your advisers, brokers, and accountants to focus on advisory growth.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto"
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-xl shadow-md transition-colors text-sm cursor-pointer"
                  >
                    Enquire with Operations
                  </motion.div>
                </Link>
                <a
                  href="tel:+94718876743"
                  className="w-full sm:w-auto"
                >
                  <motion.div
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="border border-white/20 bg-white/5 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-sm cursor-pointer"
                  >
                    Call: +94 71 887 6743
                  </motion.div>
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

    </div>
  );
}
