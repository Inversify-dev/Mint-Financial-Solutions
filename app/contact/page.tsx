'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  ChevronDown,
  Send,
  Loader2,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'How does Mint ensure client data security offshore?',
    a: 'Data privacy is our top priority. Our teams work exclusively within thin-client Virtual Desktop Infrastructures (VDI) hosted on secure servers in Australia. This blocks local downloading, saving, or copying of files. Our Colombo facility features biometrics, active CCTV monitoring, locked USB ports, and strict phone limitations in delivery spaces.'
  },
  {
    q: 'Are your paraplanners and accountants trained in Australian rules?',
    a: 'Yes, absolutely. Our onboarding curriculum includes intensive training specifically in Australian compliance frameworks. Paraplanners are certified on ASIC Statement of Advice (SOA) guidelines, superannuation, and insurance. Accountants are trained in Australian Tax Office (ATO) BAS standards, GST rules, and cloud ledger structures.'
  },
  {
    q: 'What CRM software platforms do you support?',
    a: 'We work directly within your systems. Our staff have active experience across all major Australian financial tools including Xplan, Midwinter, Coin, and AdviserLogic. For mortgages, we use ApplyOnline, Podium, and Salestrekker. For accounting and real estate, we operate Class, Simple Fund 360, Xero, and PropertyMe.'
  },
  {
    q: 'How long does it take to onboard a new offshore resource?',
    a: 'Onboarding typically takes between 2 to 4 weeks. This includes understanding your internal workflows, creating standard operating procedures (SOPs), selecting and vetting candidates matching your requirements, setting up secure software logins, and commencing our initial quality assurance monitoring.'
  },
  {
    q: 'What is the pricing model and are there lock-in contracts?',
    a: 'We charge flat, transparent monthly service fees based on the specific roles (e.g. Paraplanner, Processor, Bookkeeper) and staff numbers (full-time or hybrid). We support initial proof-of-concept projects with a zero-lock-in trial period. Standard agreements require a standard 30-day notice to scale up or down.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    email: '',
    phone: '',
    service: 'financial-planning',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side Validation for Mandatory Fields (Name, Company, Role, Email, Phone)
    if (!formData.name.trim()) {
      setErrorMsg('Full Name is required.');
      return;
    }
    if (!formData.company.trim()) {
      setErrorMsg('Company / Practice Name is required.');
      return;
    }
    if (!formData.role.trim()) {
      setErrorMsg('Your Role / Title is required.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg('Email Address is required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg('Please enter a valid Email Address format.');
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMsg('Phone Number is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const resJson = await res.json();

      if (!res.ok) {
        throw new Error(resJson.message || 'Failed to send inquiry.');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'An error occurred while sending your inquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQS.map((faq) => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  };

  return (
    <div className="bg-premium-gradient min-h-screen pt-24 sm:pt-28 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <motion.span variants={fadeInUp} className="text-xs font-bold text-primary uppercase tracking-widest">Contact Us</motion.span>
          <motion.h1 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-tight text-gradient mt-3 mb-4 sm:mb-6 px-2">
            Connect with Our Operations Center
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-sm sm:text-base text-charcoal-light leading-relaxed max-w-2xl mx-auto px-2">
            Discuss how Mint Business Solutions can streamline your practice administration, advice formatting, and accounts compliance. Connect with our Melbourne headquarters or our Colombo operations center directly.
          </motion.p>
        </motion.div>

        {/* Core Layout: Contact details & Live Map + Inquiry form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-16 sm:mb-24 max-w-6xl mx-auto">

          {/* Column 1: Contact Details & Live Interactive Map (5 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between gap-5 h-full"
          >
            {/* Contact details card */}
            <div className="bg-white border border-neutral-100 p-5 sm:p-6 rounded-3xl shadow-sm flex flex-col gap-4 flex-shrink-0">
              <h2 className="text-lg font-bold text-charcoal font-display">Office Directory</h2>

              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-charcoal-light leading-relaxed">
                    <p className="font-semibold text-charcoal text-sm">Colombo Operations Branch</p>
                    <p className="font-bold text-[10px] text-charcoal-light">Mint Business Solutions Private Limited</p>
                    <p>46a S. De S. Jayasinghe Mawatha</p>
                    <p>Colombo 10350, Sri Lanka</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-charcoal-light leading-relaxed">
                    <p className="font-semibold text-charcoal text-sm">Melbourne Head Office</p>
                    <p>13 Berrima Street, Oakleigh East</p>
                    <p>VIC 3166, Melbourne, Australia</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-primary flex-shrink-0" />
                  <a href="tel:+94718876743" className="text-xs text-charcoal-light hover:text-primary transition-colors font-medium">
                    +94 71 887 6743 (Colombo Office)
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-primary flex-shrink-0" />
                  <a href="mailto:enquiries@mintfinancialsolutions.com.au" className="text-xs text-charcoal-light hover:text-primary transition-colors font-medium break-all">
                    enquiries@mintfinancialsolutions.com.au
                  </a>
                </li>
              </ul>

              {/* Security Badge */}
              <div className="border border-neutral-100 bg-neutral-50/60 p-3 rounded-2xl flex items-center gap-2.5">
                <Shield size={18} className="text-primary flex-shrink-0" />
                <p className="text-[10px] sm:text-[11px] text-neutral-500 leading-normal">
                  Privacy Act & Australian Privacy Principles compliant. Strict physical and network governance.
                </p>
              </div>
            </div>

            {/* Live Interactive Google Map Card */}
            <div className="bg-white border border-neutral-100 p-4 rounded-3xl shadow-sm flex flex-col gap-2.5 flex-1 min-h-[200px]">
              <div className="flex justify-between items-center px-1 flex-shrink-0">
                <div>
                  <span className="text-[10px] font-bold border border-primary/20 bg-primary/10 text-primary px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Live Operations Map
                  </span>
                  <p className="text-xs font-bold text-charcoal mt-1">Colombo Center</p>
                </div>
                <Clock size={16} className="text-neutral-400" />
              </div>

              {/* Embedded Live Google Map */}
              <div className="w-full flex-1 min-h-[150px] rounded-2xl overflow-hidden border border-neutral-200 shadow-inner">
                <iframe
                  title="Mint Colombo Operations Map"
                  src="https://maps.google.com/maps?q=46a+S.+De+S.+Jayasinghe+Mawatha,+Colombo+10350,+Sri+Lanka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full rounded-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* Column 2: Inquiry Form Card (7 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white border border-neutral-100 p-5 sm:p-7 rounded-3xl shadow-xl flex flex-col justify-between h-full relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-light rounded-full blur-3xl pointer-events-none" />

            {!submitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-5 sm:space-y-6 relative z-10 w-full" noValidate>
                <div className="border-b border-neutral-100 pb-3 sm:pb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-charcoal font-display">Submit Inquiry</h2>
                  <p className="text-xs text-neutral-400 mt-1">Fields marked * are mandatory.</p>
                </div>

                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm p-3.5 rounded-xl font-medium"
                  >
                    ⚠️ {errorMsg}
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Citizen"
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs sm:text-sm px-3.5 py-3 sm:py-3.5 rounded-xl focus:outline-none focus:border-primary text-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Company / Practice Name *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Apex Wealth Planning"
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs sm:text-sm px-3.5 py-3 sm:py-3.5 rounded-xl focus:outline-none focus:border-primary text-charcoal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Your Role / Title *</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      placeholder="e.g. Principal Adviser"
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs sm:text-sm px-3.5 py-3 sm:py-3.5 rounded-xl focus:outline-none focus:border-primary text-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Service of Interest</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs sm:text-sm px-3.5 py-3 sm:py-3.5 rounded-xl focus:outline-none focus:border-primary text-charcoal cursor-pointer"
                    >
                      <option value="financial-planning">Financial Planning Support</option>
                      <option value="accounting">Accounting & Bookkeeping</option>
                      <option value="mortgages">Mortgage Loan Processing</option>
                      <option value="property">Property Management Support</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@company.com.au"
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs sm:text-sm px-3.5 py-3 sm:py-3.5 rounded-xl focus:outline-none focus:border-primary text-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +61 412 345 678"
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs sm:text-sm px-3.5 py-3 sm:py-3.5 rounded-xl focus:outline-none focus:border-primary text-charcoal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">Message / Inquiry Details (Optional)</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your team capacity needs or pipeline software details..."
                    className="w-full bg-neutral-50 border border-neutral-200 text-xs sm:text-sm px-3.5 py-3 sm:py-3.5 rounded-xl focus:outline-none focus:border-primary text-charcoal resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark disabled:bg-neutral-200 text-white font-bold py-3.5 sm:py-4 rounded-xl shadow-md shadow-primary/10 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Submitting Inquiry...
                    </>
                  ) : (
                    <>
                      Send Inquiry <Send size={15} />
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <div className="text-center py-8 flex flex-col items-center">
                <CheckCircle size={56} className="text-primary mb-4 animate-bounce" />
                <h3 className="text-lg sm:text-xl font-bold text-charcoal font-display">Inquiry Received!</h3>
                <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed max-w-sm mt-3">
                  Thank you, <strong className="text-charcoal">{formData.name}</strong>. Your operational inquiry for <strong className="text-charcoal">{formData.company}</strong> has been logged. A client transition manager will reach out via email or phone within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', company: '', role: '', email: '', phone: '', service: 'financial-planning', message: '' });
                  }}
                  className="mt-8 text-xs sm:text-sm font-bold text-primary hover:underline cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* FAQs section */}
        <div className="max-w-4xl mx-auto border-t border-neutral-100 pt-14 sm:pt-20">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 flex flex-col items-center gap-2 px-2">
            <HelpCircle size={26} className="text-primary" />
            <h2 className="text-xl sm:text-3xl font-bold font-display text-charcoal">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-charcoal-light">
              Clear answers regarding security, workflows, training cycles, and technology integrations.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            {FAQS.map((faq, idx) => {
              const isActive = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-neutral-100 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="text-xs sm:text-base font-bold text-charcoal">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-charcoal-light transition-transform duration-200 flex-shrink-0 ${isActive ? 'rotate-180 text-primary' : ''}`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isActive ? 'max-h-[300px] border-t border-neutral-50' : 'max-h-0'
                      }`}
                  >
                    <p className="p-4 sm:p-5 text-xs sm:text-base text-charcoal-light leading-relaxed bg-[#fafbfa]/40">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
