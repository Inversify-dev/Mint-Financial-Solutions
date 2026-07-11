'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, User, Upload, ArrowLeft, Send, CheckCircle, Loader2, Globe, Linkedin, Briefcase } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

function ApplicationForm() {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get('title') || 'General Application';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    linkedin: '',
    portfolio: '',
    coverLetter: '',
    privacyAccepted: false
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Dynamically load Google reCAPTCHA v3 if configured
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (siteKey && siteKey !== 'your-recaptcha-site-key') {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      document.body.appendChild(script);
      return () => {
        const checkScript = document.querySelector(`script[src*="${siteKey}"]`);
        if (checkScript) {
          document.body.removeChild(checkScript);
        }
      };
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData({
      ...formData,
      [name]: val
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const nameLower = file.name.toLowerCase();
      const extMatch = ['.pdf', '.doc', '.docx'].some(ext => nameLower.endsWith(ext));
      
      if (!extMatch) {
        setErrorMsg('Invalid file format. Please upload PDF or Word document (.doc, .docx).');
        setCvFile(null);
        e.target.value = '';
        return;
      }

      // Max file size: 10MB
      const MAX_SIZE = 10 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        setErrorMsg('File is too large. Maximum size allowed is 10MB.');
        setCvFile(null);
        e.target.value = '';
        return;
      }

      setCvFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!formData.privacyAccepted) {
      setErrorMsg('You must accept the privacy policy to submit.');
      return;
    }

    if (!cvFile) {
      setErrorMsg('Please attach your CV/Resume.');
      return;
    }

    setIsSubmitting(true);

    try {
      let recaptchaToken = '';
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      
      const safeWindow = window as Window & {
        grecaptcha?: {
          execute?: (key: string, options: { action: string }) => Promise<string>;
        };
      };

      if (siteKey && siteKey !== 'your-recaptcha-site-key' && safeWindow.grecaptcha?.execute) {
        recaptchaToken = await safeWindow.grecaptcha.execute(siteKey, { action: 'apply' });
      }

      const submitData = new FormData();
      submitData.append('firstName', formData.firstName);
      submitData.append('lastName', formData.lastName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('country', formData.country);
      submitData.append('linkedin', formData.linkedin);
      submitData.append('portfolio', formData.portfolio);
      submitData.append('coverLetter', formData.coverLetter);
      submitData.append('jobTitle', jobTitle);
      submitData.append('recaptchaToken', recaptchaToken);
      submitData.append('resume', cvFile);

      const res = await fetch('/api/apply', {
        method: 'POST',
        body: submitData
      });

      const resJson = await res.json();
      if (!res.ok) {
        throw new Error(resJson.message || 'Failed to submit application.');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'An error occurred while sending your application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-white pt-32 pb-24 relative overflow-hidden flex items-center justify-center">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] bg-accent-light/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-xl w-full mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Back Link */}
        <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Open Positions
        </Link>

        {/* Form Card Container */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-neutral-900/60 backdrop-blur-xl border border-white/[0.06] rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10 w-full">
              <div>
                <h1 className="text-2xl font-bold font-display text-white">Apply for Role</h1>
                <p className="text-sm text-neutral-400 mt-1.5 font-semibold">Position: <span className="text-primary">{jobTitle}</span></p>
              </div>

              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Name Fields (First & Last) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">First Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 text-neutral-500" size={16} />
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="e.g. John"
                      className="w-full bg-neutral-800/60 border border-white/[0.08] text-sm pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-primary text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Last Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 text-neutral-500" size={16} />
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="e.g. Citizen"
                      className="w-full bg-neutral-800/60 border border-white/[0.08] text-sm pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-primary text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-neutral-500" size={16} />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. name@company.com"
                    className="w-full bg-neutral-800/60 border border-white/[0.08] text-sm pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-primary text-white"
                  />
                </div>
              </div>

              {/* Phone & Country Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 text-neutral-500" size={16} />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +94 77 123 4567"
                      className="w-full bg-neutral-800/60 border border-white/[0.08] text-sm pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-primary text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Country *</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-3.5 text-neutral-500" size={16} />
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="e.g. Sri Lanka"
                      className="w-full bg-neutral-800/60 border border-white/[0.08] text-sm pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-primary text-white"
                    />
                  </div>
                </div>
              </div>

              {/* LinkedIn & Portfolio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">LinkedIn Profile URL</label>
                  <div className="relative">
                    <Linkedin className="absolute left-4 top-3.5 text-neutral-500" size={16} />
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="e.g. linkedin.com/in/username"
                      className="w-full bg-neutral-800/60 border border-white/[0.08] text-sm pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-primary text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Portfolio / Website URL</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-3.5 text-neutral-500" size={16} />
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      placeholder="e.g. github.com/username"
                      className="w-full bg-neutral-800/60 border border-white/[0.08] text-sm pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-primary text-white"
                    />
                  </div>
                </div>
              </div>

              {/* CV File Upload */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Attach CV / Resume *</label>
                <div className="border-2 border-dashed border-white/[0.08] hover:border-primary/50 transition-colors rounded-xl p-6 text-center cursor-pointer relative bg-neutral-800/20">
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <Upload className="mx-auto text-neutral-500 mb-2.5" size={24} />
                  <p className="text-xs text-neutral-300 font-bold">
                    {cvFile ? cvFile.name : 'Click to select or drag PDF / Word document'}
                  </p>
                  <p className="text-[10px] text-neutral-500 mt-1 font-medium">Acceptable formats: PDF, DOC, DOCX. Max: 10MB</p>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Cover Message</label>
                <textarea
                  name="coverLetter"
                  rows={4}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Introduce yourself and tell us why you want to join our global team..."
                  className="w-full bg-neutral-800/60 border border-white/[0.08] text-sm px-4 py-3.5 rounded-xl focus:outline-none focus:border-primary text-white resize-none"
                />
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="privacyAccepted"
                  id="privacyAccepted"
                  required
                  checked={formData.privacyAccepted}
                  onChange={handleInputChange}
                  className="mt-1 h-4.5 w-4.5 accent-primary cursor-pointer border border-neutral-600 rounded bg-neutral-800 focus:ring-primary focus:ring-offset-neutral-900"
                />
                <label htmlFor="privacyAccepted" className="text-xs text-neutral-400 leading-normal select-none cursor-pointer font-medium">
                  I accept the Privacy Policy and agree that Mint Financial Solutions may collect and store my application details and file for recruitment purposes. *
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-md shadow-primary/10 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending Application...
                  </>
                ) : (
                  <>
                    Submit Application <Send size={15} />
                  </>
                )}
              </motion.button>

            </form>
          ) : (
            <div className="text-center py-8 flex flex-col items-center">
              <CheckCircle size={56} className="text-primary mb-4 animate-bounce" />
              <h2 className="text-xl font-bold font-display text-white">Application Sent!</h2>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-sm mt-3 font-medium">
                Thank you, <strong className="text-white">{formData.firstName} {formData.lastName}</strong>. Your application details and attached CV ({cvFile?.name}) have been successfully processed.
              </p>
              <p className="text-xs text-neutral-500 mt-2 font-medium">We will review your files and contact you shortly.</p>
              
              <Link href="/careers" className="mt-8 inline-block bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold py-3 px-6 rounded-xl transition-colors">
                Return to Careers
              </Link>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="bg-neutral-950 min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={24} className="animate-spin mx-auto text-primary mb-3" />
          <p className="text-xs text-neutral-500">Loading form...</p>
        </div>
      </div>
    }>
      <ApplicationForm />
    </Suspense>
  );
}

