import React from 'react';
import type { Metadata } from 'next';
import { getBlogPosts, getCategories, getFeaturedPost } from '../../lib/cms';
import InsightsPageClient from './InsightsPageClient';

// Never let this route be served from a cached snapshot
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Insights, Compliance & BPO Strategy Blog | Mint',
  description: 'Operational insights, compliance tips, and BPO outsourcing strategies for Australian financial advisers, mortgage brokers, and accountants.',
  alternates: {
    canonical: '/insights',
  }
};

export default async function InsightsPage(props: {
  searchParams: Promise<{ search?: string; category?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const activeCategory = searchParams.category || '';
  const activeSearch = searchParams.search || '';
  const currentPage = parseInt(searchParams.page || '1', 10) || 1;
  const perPage = 7;

  // Fetch categories first — this is the single source of truth for both
  // the pills AND the filter, so they can never disagree with each other.
  const categories = await getCategories();

  const matchedCategory = activeCategory
    ? categories.find((c) => c.slug.toLowerCase() === activeCategory.toLowerCase())
    : undefined;

  const showFeaturedSlot = activeCategory === '' && activeSearch === '' && currentPage === 1;
  const featuredPost = showFeaturedSlot ? await getFeaturedPost() : undefined;

  const { posts, totalPosts, totalPages } = await getBlogPosts({
    categoryId: matchedCategory?.id,
    search: activeSearch,
    page: currentPage,
    perPage: perPage,
    excludeId: featuredPost?.id
  });

  return (
    <InsightsPageClient
      posts={posts}
      featuredPost={featuredPost ?? null}
      categories={categories}
      totalPosts={totalPosts}
      totalPages={totalPages}
      currentPage={currentPage}
      activeCategory={activeCategory}
      activeSearch={activeSearch}
    />
  );
}