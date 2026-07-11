'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronRight, RefreshCw, ChevronLeft } from 'lucide-react';
import { BlogPost, Category } from '../../lib/cms';
import SearchInput from './SearchInput';

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

interface InsightsPageClientProps {
  posts: BlogPost[];
  featuredPost: BlogPost | null;   // ← add this

  categories: Category[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  activeCategory: string;
  activeSearch: string;
}

export default function InsightsPageClient({
  posts,
  featuredPost,        // ← accept it directly

  categories,
  totalPages,
  currentPage,
  activeCategory,
  activeSearch
}: InsightsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const listPosts = posts;   // no more slicing/guessing needed

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`/insights?${params.toString()}`);
  };

  return (
    <div className="bg-premium-gradient min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span variants={fadeInUp} className="text-xs font-bold text-primary uppercase tracking-widest">Resources</motion.span>
          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-tight text-gradient mt-3 mb-6">
            Insights, Compliance & Strategy
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-base text-charcoal-light leading-relaxed max-w-2xl mx-auto">
            Stay ahead of regulatory updates and learn operational strategies to optimize back-offices, manage remote teams, and lower operational overheads.
          </motion.p>
        </motion.div>

        {/* Featured Post Card */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto mb-16"
          >
            <div className="bg-white border border-neutral-100 rounded-3xl overflow-hidden shadow-xl shadow-neutral-100/40 dark:shadow-none grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-full bg-neutral-100 overflow-hidden">
                <img
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="lg:col-span-5 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-xs font-bold text-primary uppercase tracking-wider">
                    <span>Featured Article</span>
                    <span>•</span>
                    <span>{featuredPost.categories[0]}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-charcoal mb-4 hover:text-primary transition-colors leading-snug">
                    <Link href={`/insights/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h2>

                  <p className="text-sm text-charcoal-light leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="border-t border-neutral-50 pt-6 mt-4 flex items-center justify-between">
                  <div className="text-xs">
                    <p className="font-bold text-charcoal">{featuredPost.author.name}</p>
                    <p className="text-neutral-400 text-[11px]">{featuredPost.date}</p>
                  </div>

                  <Link
                    href={`/insights/${featuredPost.slug}`}
                    className="text-sm font-bold text-primary flex items-center gap-1 hover:underline"
                  >
                    Read Article <ChevronRight size={14} />
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Search & Filters Hub */}
        <div className="max-w-5xl mx-auto bg-white border border-neutral-100 p-5 rounded-3xl shadow-md mb-12 flex flex-col sm:flex-row gap-4 items-center justify-between">

          {/* Categories select pills */}
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            <Link
              href="/insights"
              prefetch={false}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${activeCategory === ''
                ? 'bg-primary text-white border-primary'
                : 'bg-neutral-50 text-charcoal-light border-neutral-100 hover:border-neutral-300'
                }`}
            >
              All Articles
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/insights?category=${encodeURIComponent(cat.slug)}`}
                prefetch={false}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${activeCategory.toLowerCase() === cat.slug.toLowerCase()
                  ? 'bg-primary text-white border-primary'
                  : 'bg-neutral-50 text-charcoal-light border-neutral-100 hover:border-neutral-300'
                  }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Search bar */}
          <SearchInput initialValue={activeSearch} />

        </div>

        {/* Regular Posts Grid */}
        <div className="max-w-5xl mx-auto">
          {listPosts.length > 0 ? (
            <>
              <motion.div
                key={`${activeCategory}-${activeSearch}-${currentPage}`}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {listPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    variants={fadeInUp}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="bg-white border border-neutral-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
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

                    <div className="px-6 pb-6 pt-0 border-t border-neutral-50 mt-4">
                      <div className="text-xs">
                        <p className="font-semibold text-charcoal">{post.author.name}</p>
                        <p className="text-neutral-400 text-[11px]">{post.date}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="p-2 border border-neutral-200 rounded-xl hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-charcoal"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-sm text-neutral-500 font-semibold px-4">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="p-2 border border-neutral-200 rounded-xl hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors text-charcoal"
                    aria-label="Next Page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 border border-dashed border-neutral-200 rounded-3xl bg-white">
              <RefreshCw className="mx-auto mb-4 text-neutral-300 animate-spin" size={32} />
              <h3 className="text-base font-bold text-charcoal">No Articles Match Your Search</h3>
              <p className="text-sm text-neutral-400 mt-1 max-w-sm mx-auto">
                Try searching different terms or resetting categories to discover all advice and strategy listings.
              </p>
              <Link
                href="/insights"
                prefetch={false}
                className="mt-5 inline-block text-sm font-bold text-primary hover:underline cursor-pointer"
              >
                Reset Search
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
