import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { getBlogPostBySlug, getBlogPosts } from '../../../lib/cms';
import ShareWidget from './ShareWidget';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Article Not Found | Mint Financial Solutions',
    };
  }

  return {
    title: `${post.title} | Insights | Mint Financial Solutions`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.featuredImage }],
      type: 'article',
    },
    alternates: {
      canonical: `/insights/${post.slug}`,
    }
  };
}

export async function generateStaticParams() {
  const { posts } = await getBlogPosts({ perPage: 100 });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = true;

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-charcoal">Article Not Found</h1>
        <p className="text-xs text-neutral-400 mt-2">The article you are seeking may have been renamed or archived.</p>
        <Link href="/insights" className="text-xs font-bold text-primary mt-6 hover:underline inline-flex items-center gap-1 cursor-pointer">
          <ArrowLeft size={14} /> Back to Insights Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-premium-gradient min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2 text-xs font-bold text-charcoal-light uppercase tracking-wider">
          <Link href="/" className="hover:text-primary transition-colors cursor-pointer">Home</Link>
          <ChevronRight size={10} className="text-neutral-300" />
          <Link href="/insights" className="hover:text-primary transition-colors cursor-pointer">Insights</Link>
          <ChevronRight size={10} className="text-neutral-300" />
          <span className="text-neutral-400 truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
        </div>

        {/* Back Link */}
        <div className="mb-10">
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-charcoal-light hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Insights Hub
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 items-center mb-4">
            {post.categories.map((cat) => (
              <span
                key={cat}
                className="text-xs font-bold bg-accent-light text-primary py-1 px-3 rounded-full uppercase tracking-wider border border-primary/10"
              >
                {cat}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-charcoal leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author metadata */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-y border-neutral-100 py-6">
            <div className="flex items-center gap-3">
              {/* <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover"
              /> */}
              <div>
                <p className="text-sm font-bold text-charcoal">{post.author.name}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-charcoal-light font-semibold">
              <span className="flex items-center gap-1">{post.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">{post.readingTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden border border-neutral-100 mb-10 shadow-sm">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Article Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

          {/* Share widget (2 Columns) */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <ShareWidget />
          </div>

          {/* Article Text Content (10 Columns) */}
          <div className="lg:col-span-10 order-1 lg:order-2">
            <article className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-charcoal prose-p:text-base prose-p:leading-relaxed prose-p:text-charcoal-light prose-li:text-base prose-li:text-charcoal-light prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3">
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="flex flex-col gap-4"
              />
            </article>

            {/* Post Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-10 border-t border-neutral-100 pt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold bg-neutral-50 text-neutral-400 px-2.5 py-1.5 rounded-lg border border-neutral-100 animate-none"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Lead generation banner at the bottom of the article */}
            <div className="border border-primary/20 bg-accent-light/40 p-6 sm:p-8 rounded-3xl mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <h4 className="text-base font-bold text-charcoal font-display">Grow Your Onshore Business Margins</h4>
                <p className="text-sm text-charcoal-light mt-1 animate-none">Our Colombo experts integrate directly with your systems.</p>
              </div>
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary-dark text-white text-sm font-bold py-3.5 px-6 rounded-xl shadow-md shadow-primary/10 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer text-center"
              >
                Inquire About Outsourcing
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

