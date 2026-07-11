'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { JobPosting } from '../../lib/cms';

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

interface CareersPageClientProps {
  jobs: JobPosting[];
  departments: string[];
  jobTypes: string[];
  activeSearch: string;
  activeDept: string;
  activeType: string;
}

export default function CareersPageClient({
  jobs,
  departments,
  jobTypes,
  activeSearch,
  activeDept,
  activeType
}: CareersPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Track which job cards have their details expanded
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/careers?${params.toString()}`);
  };

  const handleSearchChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val.trim()) {
      params.set('search', val);
    } else {
      params.delete('search');
    }
    router.push(`/careers?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push('/careers');
  };

  return (
    <div className="bg-white min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span variants={fadeInUp} className="text-xs font-bold text-primary uppercase tracking-widest">Careers</motion.span>
          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-tight text-charcoal mt-3 mb-6">
            Build a Career in Global Financial Operations
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-base text-charcoal-light leading-relaxed max-w-2xl mx-auto">
            Secure a prestigious, long-term role working directly with our Melbourne headquarters. We offer competitive compensation, comprehensive private health coverage, professional study support (CIMA/CA/CPA), and a collaborative, high-performance workspace in Colombo.
          </motion.p>
        </motion.div>

        {/* Filters and Search Dashboard */}
        <div className="max-w-4xl mx-auto bg-[#fafbfa] border border-neutral-200/50 p-6 rounded-2xl mb-12 flex flex-col md:flex-row gap-4 items-center">
          {/* Search bar */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-3.5 text-neutral-400" size={16} />
            <input
              type="text"
              placeholder="Search jobs by title or key requirements..."
              value={activeSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-white border border-neutral-200 text-sm pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary text-charcoal"
            />
          </div>

          {/* Department filter */}
          <select
            value={activeDept}
            onChange={(e) => handleFilterChange('dept', e.target.value)}
            className="w-full md:w-48 bg-white border border-neutral-200 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-charcoal cursor-pointer"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* Job Type filter */}
          <select
            value={activeType}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full md:w-44 bg-white border border-neutral-200 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-primary text-charcoal cursor-pointer"
          >
            <option value="">All Work Types</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Job Listings Grid */}
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => {
              const isExpanded = expandedJobId === job.id;
              return (
                <motion.div
                  key={job.id}
                  layout="position"
                  className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'border-primary shadow-lg shadow-neutral-100' : 'border-neutral-200/60 shadow-sm hover:border-neutral-300'
                  }`}
                >
                  {/* Job Card Header */}
                  <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                      <div className="flex flex-wrap gap-2 items-center mb-3">
                        <span className="text-xs font-bold bg-[#F6F9F5] text-primary py-1 px-3 rounded-full uppercase tracking-wider">
                          {job.department}
                        </span>
                        <span className="text-xs font-bold bg-neutral-100 text-neutral-500 py-1 px-3 rounded-full uppercase tracking-wider">
                          {job.type}
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-charcoal font-display">
                        {job.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-charcoal-light mt-2.5 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-neutral-400" /> {job.location}
                        </span>
                        {job.salaryRange && (
                          <span className="flex items-center gap-1.5">
                            <Briefcase size={14} className="text-neutral-400" /> {job.salaryRange}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => toggleExpand(job.id)}
                        className="flex-1 sm:flex-initial text-center border border-neutral-200 text-charcoal font-semibold text-sm py-3 px-5 rounded-xl hover:bg-neutral-50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {isExpanded ? (
                          <>Hide Details <ChevronUp size={14} /></>
                        ) : (
                          <>View Details <ChevronDown size={14} /></>
                        )}
                      </button>

                      <Link
                        href={`/careers/apply?title=${encodeURIComponent(job.title)}`}
                        className="flex-1 sm:flex-initial text-center bg-primary hover:bg-primary-dark text-white font-bold text-sm py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Apply <Mail size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Expanded Job details */}
                  {isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-neutral-100 bg-[#fafbfa]/40 p-6 sm:p-8 flex flex-col gap-6"
                    >
                      {job.description && (
                        <div className="min-w-0">
                          <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-2 font-display">About the Role</h3>
                          <div 
                            className="text-sm text-charcoal-light leading-relaxed prose prose-sm max-w-none break-words [word-break:break-word] [overflow-wrap:anywhere]"
                            dangerouslySetInnerHTML={{ __html: job.description }}
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {job.requirements && job.requirements.length > 0 && (
                          <div className="min-w-0">
                            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-3 font-display">Requirements</h3>
                            <ul className="space-y-2">
                              {job.requirements.map((req, idx) => (
                                <li key={idx} className="flex gap-2 items-start text-sm text-charcoal-light leading-relaxed break-words [word-break:break-word] [overflow-wrap:anywhere] min-w-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2.5" />
                                  <span className="min-w-0 flex-1">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {job.responsibilities && job.responsibilities.length > 0 && (
                          <div className="min-w-0">
                            <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-3 font-display">Core Responsibilities</h3>
                            <ul className="space-y-2">
                              {job.responsibilities.map((resp, idx) => (
                                <li key={idx} className="flex gap-2 items-start text-sm text-charcoal-light leading-relaxed break-words [word-break:break-word] [overflow-wrap:anywhere] min-w-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2.5" />
                                  <span className="min-w-0 flex-1">{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {job.benefits && job.benefits.length > 0 && (
                        <div className="min-w-0">
                          <h3 className="text-xs font-bold text-charcoal uppercase tracking-wider mb-3 font-display">Benefits & Perks</h3>
                          <ul className="space-y-2">
                            {job.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex gap-2 items-start text-sm text-charcoal-light leading-relaxed break-words [word-break:break-word] [overflow-wrap:anywhere] min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2.5" />
                                <span className="min-w-0 flex-1">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="border-t border-neutral-100 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-neutral-100">
                        <div>
                          <h4 className="text-sm font-bold text-charcoal font-display">Submit Application</h4>
                          <p className="text-xs text-charcoal-light mt-0.5 font-semibold">Please fill out our online form and upload your resume directly.</p>
                        </div>
                        <Link
                          href={`/careers/apply?title=${encodeURIComponent(job.title)}`}
                          className="bg-primary hover:bg-primary-dark text-white font-bold text-sm py-3 px-6 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          Apply Online <Mail size={15} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-16 border border-dashed border-neutral-200 rounded-2xl bg-white">
              <h3 className="text-base font-bold text-charcoal">No Vacancies Match Your Filter</h3>
              <p className="text-sm text-neutral-400 mt-1">Try resetting search parameters to explore all career roles.</p>
              <button
                onClick={resetFilters}
                className="mt-4 text-sm font-bold text-primary hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
