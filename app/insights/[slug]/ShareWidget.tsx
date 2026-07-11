'use client';

import React, { useState } from 'react';
import { Link as LinkIcon, Linkedin, Twitter, CheckCircle2 } from 'lucide-react';

export default function ShareWidget() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="lg:sticky lg:top-28 flex lg:flex-col justify-start items-center gap-3 border border-neutral-100 bg-white p-3.5 rounded-2xl shadow-sm">
      <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest hidden lg:block mb-2">Share</span>
      
      <button
        onClick={handleCopyLink}
        className="p-2.5 rounded-xl border border-neutral-100 hover:border-primary/20 text-charcoal hover:text-primary transition-all relative group flex items-center justify-center bg-neutral-50/50 cursor-pointer"
        aria-label="Copy Link"
      >
        {copied ? <CheckCircle2 size={16} className="text-primary animate-pulse" /> : <LinkIcon size={16} />}
        <span className="absolute left-full lg:left-1/2 lg:-translate-x-1/2 lg:bottom-full ml-2 lg:ml-0 lg:mb-2 bg-neutral-900 text-white text-xs px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {copied ? 'Link Copied!' : 'Copy Link'}
        </span>
      </button>

      <button
        onClick={handleShareLinkedIn}
        className="p-2.5 rounded-xl border border-neutral-100 hover:border-primary/20 text-charcoal hover:text-primary transition-all relative group flex items-center justify-center bg-neutral-50/50 cursor-pointer"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={16} />
        <span className="absolute left-full lg:left-1/2 lg:-translate-x-1/2 lg:bottom-full ml-2 lg:ml-0 lg:mb-2 bg-neutral-900 text-white text-xs px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          Share on LinkedIn
        </span>
      </button>

      <button
        onClick={handleShareTwitter}
        className="p-2.5 rounded-xl border border-neutral-100 hover:border-primary/20 text-charcoal hover:text-primary transition-all relative group flex items-center justify-center bg-neutral-50/50 cursor-pointer"
        aria-label="Share on Twitter"
      >
        <Twitter size={16} />
        <span className="absolute left-full lg:left-1/2 lg:-translate-x-1/2 lg:bottom-full ml-2 lg:ml-0 lg:mb-2 bg-neutral-900 text-white text-xs px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          Share on Twitter
        </span>
      </button>
    </div>
  );
}
