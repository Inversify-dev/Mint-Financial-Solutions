'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield, Award, Users, MapPin, Globe } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AboutPage() {
  const pillars = [
    {
      icon: <Shield size={24} className="text-primary" />,
      title: 'Bank-Grade Operational Security',
      desc: 'Our Colombo team executes tasks exclusively via secure onshore virtual desktop interfaces (VDIs). Client databases remain within Australian boundaries, enforcing a strict no-local-data storage standard.'
    },
    {
      icon: <Award size={24} className="text-primary" />,
      title: 'Australian System Training',
      desc: 'Every specialist undergoes thorough onboarding in Australian advice workflows, tax compliance structures, and lending guidelines, working natively in Xplan, Xero, and major CRM portals.'
    },
    {
      icon: <Users size={24} className="text-primary" />,
      title: 'Cohesive Extension Model',
      desc: 'We are not a vendor; we operate as a direct subsidiary. Our Colombo and Melbourne teams collaborate daily under unified oversight to ensure seamless, standardized service delivery.'
    }
  ];

  return (
    <div className="bg-premium-gradient min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <motion.span variants={fadeInUp} className="text-xs font-bold text-primary uppercase tracking-widest">Our Identity</motion.span>
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-tight text-gradient">
              The Secure Offshore Operations Branch of Mint Financial Solutions
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-base text-charcoal-light/95 leading-relaxed font-medium">
              Mint Business Solutions Private Limited is the fully owned subsidiary of Mint Financial Solutions Pty Ltd (Melbourne, Australia).
            </motion.p>
            <motion.p variants={fadeInUp} className="text-sm text-charcoal-light leading-relaxed">
              Founded by experienced Australian <Link href="/services" className="text-primary hover:underline font-semibold">financial planners</Link>, <Link href="/services" className="text-primary hover:underline font-semibold">accountants</Link>, and <Link href="/services" className="text-primary hover:underline font-semibold">mortgage specialists</Link>, we bridge the gap between onshore practice growth and back-office capacity. Our Colombo operations center delivers high-quality, APP-aligned <Link href="/services" className="text-primary hover:underline font-semibold">paraplanning support</Link>, accounts compilation, and <Link href="/services" className="text-primary hover:underline font-semibold">loan tracking services</Link>. By combining Australia's strict quality benchmarks with Sri Lanka's highly qualified financial talent pool, we enable firms to reduce turnaround times, automate administrative compliance, and maximize client relationship hours.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-4 items-center mt-2">
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3.5 rounded-full text-sm shadow-md shadow-primary/10 transition-colors cursor-pointer"
                >
                  Connect With Us
                </motion.div>
              </Link>
              <Link href="/careers">
                <motion.div
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  className="border border-neutral-200 text-charcoal font-semibold px-6 py-3.5 rounded-full text-sm hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Join Our Team
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-3xl transform rotate-2 pointer-events-none" />
            <div className="relative border border-neutral-100 bg-white p-8 rounded-3xl shadow-xl flex flex-col gap-6">
              <h2 className="text-base font-bold text-charcoal font-display border-b border-neutral-50 pb-3 flex items-center gap-2">
                <Globe size={18} className="text-primary" /> Joint Values
              </h2>
              
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-charcoal">Absolute Alignment</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">Identical quality metrics, templates, and systems to onshore teams.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-charcoal">Security & Compliance</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">100% adherence to Australian Privacy Principles (APPs).</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-charcoal">Operational Excellence</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">Qualified specialists trained specifically in Australian compliance.</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* 2. THE SRI LANKAN CAPABILITY ADVANTAGE */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="py-20 bg-white border border-neutral-100 rounded-3xl p-8 sm:p-12 mb-24 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-light rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Colombo Advantage</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-charcoal">
                Why Colombo is Our Dedicated Back-Office Hub
              </h2>
              <p className="text-sm text-charcoal-light leading-relaxed">
                Back-office operations—including statement formatting, tax preparation, SMSF auditing, and loan processing—require rigorous technical capacity, standard compliance knowledge, and precise execution.
              </p>
              <p className="text-sm text-charcoal-light leading-relaxed">
                Colombo is globally recognized as a leading business and education hub, hosting the second-largest concentration of CIMA-qualified professionals worldwide. This provides our operations center with a deep pool of highly trained, business-fluent commerce graduates who understand the strict regulatory expectations of Australian financial practices.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-neutral-50 p-6 rounded-2xl text-center border border-neutral-100">
                <p className="text-4xl font-extrabold font-display text-primary">CIMA</p>
                <p className="text-sm font-bold text-charcoal mt-2">Finance Hub</p>
                <p className="text-xs text-neutral-400 mt-1">2nd largest concentration in the world.</p>
              </div>
              <div className="bg-neutral-50 p-6 rounded-2xl text-center border border-neutral-100">
                <p className="text-4xl font-extrabold font-display text-primary">4.5h</p>
                <p className="text-sm font-bold text-charcoal mt-2">Timezone Overlap</p>
                <p className="text-xs text-neutral-400 mt-1">Enables real-time collaboration with Melbourne.</p>
              </div>
            </div>

          </div>
        </motion.section>

        {/* 3. CORE SERVICE PILLARS */}
        <section className="space-y-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Service Standards</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-charcoal mt-3 mb-4">
              Delivering Melbourne Quality Standards Offshore
            </h2>
            <p className="text-sm sm:text-base text-charcoal-light">
              We ensure our Colombo operations feel like an integrated desk inside your local Australian office.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {pillars.map((p, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white border border-neutral-100 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col gap-5 hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent-light flex items-center justify-center">
                  {p.icon}
                </div>
                <h3 className="text-base font-bold text-charcoal font-display">{p.title}</h3>
                <p className="text-sm text-charcoal-light leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 4. OFFICE LOCATIONS CONTACT CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-neutral-100 bg-white rounded-3xl p-8 sm:p-12 shadow-sm text-center"
        >
          <MapPin size={36} className="text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-charcoal mb-2 font-display">Practice Offices</h2>
          <p className="text-sm text-charcoal-light max-w-lg mx-auto mb-8">
            We operate out of our premium branch facility in Colombo, working directly with the Australian headquarters in Melbourne.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto text-left border-t border-neutral-50 pt-8">
            <div>
              <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-3 text-primary">Colombo Branch</h3>
              <p className="text-sm text-charcoal-light font-semibold">Mint Business Solutions Private Limited</p>
              <p className="text-sm text-charcoal-light mt-1">46a S. De S. Jayasinghe Mawatha</p>
              <p className="text-sm text-charcoal-light">Colombo 10350, Sri Lanka</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-3 text-primary">Melbourne Head Office</h3>
              <p className="text-sm text-charcoal-light font-semibold">Mint Financial Solutions Australia</p>
              <p className="text-sm text-charcoal-light mt-1">13 Berrima Street, Oakleigh East</p>
              <p className="text-sm text-charcoal-light">VIC 3166, Melbourne, Australia</p>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
