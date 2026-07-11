export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: Author;
  date: string;
  readingTime: string;
  categories: string[];
  tags: string[];
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange: string;
  benefits: string[];
  displayOrder?: number;
}

export interface ServiceDetail {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  technologies: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

const getWordPressUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  if (!url || url === 'https://your-wordpress-site.com' || url.includes('your-wordpress-site')) {
    return '';
  }
  return url;
};

const countWords = (html: string): number => {
  const text = html.replace(/<[^>]*>/g, ' ');
  return text.trim().split(/\s+/).filter(Boolean).length;
};

const calculateReadingTime = (html: string): string => {
  const words = countWords(html);
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

const formatDate = (dateStr: string): string => {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

export interface WordPressPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  content?: { rendered: string };
  excerpt?: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url?: string }>;
    author?: Array<{
      name?: string;
      avatar_urls?: Record<string, string>;
      description?: string;
    }>;
    'wp:term'?: Array<Array<{ name: string }>>;
  };
}

export interface WordPressJob {
  id: number;
  title: { rendered: string };
  content?: { rendered: string };
  acf?: {
    location?: string;
    department?: string;
    employment?: string;
    description?: string;
    requirements?: string[] | string;
    responsibilities?: string[] | string;
    salary?: string;
    benefits?: string[] | string;
    display_order?: string | number;
  };
}

export function mapWordPressPost(wpPost: WordPressPost): BlogPost {
  const embedded = wpPost._embedded || {};

  let featuredImage = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200';
  if (embedded['wp:featuredmedia'] && embedded['wp:featuredmedia'][0]) {
    featuredImage = embedded['wp:featuredmedia'][0].source_url || featuredImage;
  }

  let author: Author = {
    name: 'Mint Editorial',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    role: 'Staff Writer'
  };
  if (embedded['author'] && embedded['author'][0]) {
    author = {
      name: embedded['author'][0].name || author.name,
      avatar: embedded['author'][0].avatar_urls?.['96'] || author.avatar,
      role: embedded['author'][0].description || author.role
    };
  }

  const categories: string[] = [];
  const tags: string[] = [];

  if (embedded['wp:term']) {
    const wpCats = embedded['wp:term'][0] || [];
    const wpTags = embedded['wp:term'][1] || [];
    wpCats.forEach((cat: { name: string }) => categories.push(cat.name));
    wpTags.forEach((tag: { name: string }) => tags.push(tag.name));
  }

  const content = wpPost.content?.rendered || '';
  const excerpt = wpPost.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '';

  return {
    id: String(wpPost.id),
    title: wpPost.title?.rendered || '',
    slug: wpPost.slug || '',
    content,
    excerpt,
    featuredImage,
    author,
    date: formatDate(wpPost.date),
    readingTime: calculateReadingTime(content),
    categories: categories.length > 0 ? categories : ['Insights'],
    tags: tags
  };
}

const parseListField = (field: unknown): string[] => {
  if (Array.isArray(field)) {
    return field.filter((item): item is string => typeof item === 'string');
  }
  if (typeof field === 'string' && field.trim()) {
    return field
      .split(/\r?\n|,/)
      .map(item => item.trim())
      .filter(Boolean);
  }
  return [];
};

export function mapWordPressJob(wpJob: WordPressJob): JobPosting {
  const acf = wpJob.acf || {};

  const department = acf.department || 'General';
  const type = acf.employment || 'Full-time';

  return {
    id: String(wpJob.id),
    title: wpJob.title?.rendered || '',
    department: department,
    location: acf.location || 'Colombo, Sri Lanka (Hybrid)',
    type: type,
    description: acf.description || wpJob.content?.rendered || '',
    requirements: parseListField(acf.requirements),
    responsibilities: parseListField(acf.responsibilities),
    salaryRange: acf.salary || '',
    benefits: parseListField(acf.benefits),
    displayOrder: typeof acf.display_order === 'number' ? acf.display_order : parseInt(acf.display_order || '0') || 0
  };
}

/**
 * Fetches posts. Prefer passing `categoryId` (resolved by the page from the
 * same getCategories() list rendered in the pills) over `category` (slug).
 * This guarantees the filter pills and the fetched data can never disagree,
 * and a failed lookup never silently returns zero posts.
 */
export async function getBlogPosts(params: {
  category?: string;
  categoryId?: number;
  tag?: string;
  search?: string;
  page?: number;
  perPage?: number;
  excludeId?: string;
} = {}): Promise<{ posts: BlogPost[]; totalPosts: number; totalPages: number }> {
  const wpUrl = getWordPressUrl();
  if (!wpUrl) {
    return { posts: [], totalPosts: 0, totalPages: 1 };
  }

  try {
    const query = new URLSearchParams();
    query.set('_embed', '1');
    if (params.search) query.set('search', params.search);
    if (params.page) query.set('page', String(params.page));
    if (params.perPage) query.set('per_page', String(params.perPage));
    if (params.excludeId) query.set('exclude', params.excludeId);

    if (params.categoryId) {
      query.set('categories', String(params.categoryId));
    } else if (params.category) {
      const catId = await getCategoryIdBySlug(params.category);
      if (catId) {
        query.set('categories', String(catId));
      }
      // Deliberately no else branch: if resolution fails we show everything
      // rather than filtering to an impossible id and returning zero posts.
    }

    if (params.tag) {
      const tagId = await getTagIdBySlug(params.tag);
      if (tagId) query.set('tags', String(tagId));
    }

    const res = await fetch(`${wpUrl}/wp-json/wp/v2/posts?${query.toString()}`, {
      cache: 'no-store'
    });

    console.log('FETCHED URL:', `${wpUrl}/wp-json/wp/v2/posts?${query.toString()}`);
    console.log('STATUS:', res.status);
    const rawBody = await res.clone().text();
    console.log('RAW BODY (first 400 chars):', rawBody.slice(0, 400));

    if (!res.ok) {
      console.error('WordPress posts fetch failed:', res.status, await res.text());
      return { posts: [], totalPosts: 0, totalPages: 1 };
    }
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      console.error('WordPress posts response was not JSON');
      return { posts: [], totalPosts: 0, totalPages: 1 };
    }

    const wpPosts = await res.json() as WordPressPost[];
    const totalPosts = parseInt(res.headers.get('x-wp-total') || '0', 10) || wpPosts.length;
    const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '0', 10) || 1;

    return {
      posts: wpPosts.map(mapWordPressPost),
      totalPosts,
      totalPages
    };
  } catch (error) {
    console.error('WordPress fetch error:', error);
    return { posts: [], totalPosts: 0, totalPages: 1 };
  }
}

export async function getFeaturedPost(): Promise<BlogPost | undefined> {
  const wpUrl = getWordPressUrl();
  if (!wpUrl) return undefined;

  try {
    const res = await fetch(`${wpUrl}/wp-json/wp/v2/posts?sticky=true&_embed=1&per_page=1`, {
      cache: 'no-store'
    });
    if (!res.ok) return undefined;
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return undefined;
    const posts = await res.json() as WordPressPost[];
    if (posts.length === 0) return undefined;
    return mapWordPressPost(posts[0]);
  } catch (error) {
    console.error('WordPress featured post fetch error:', error);
    return undefined;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const wpUrl = getWordPressUrl();
  if (!wpUrl) return undefined;

  try {
    const res = await fetch(`${wpUrl}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1`, {
      cache: 'no-store'
    });
    if (!res.ok) return undefined;
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return undefined;
    const posts = await res.json() as WordPressPost[];
    if (posts.length === 0) return undefined;
    return mapWordPressPost(posts[0]);
  } catch (error) {
    console.error(`WordPress single post fetch error for slug ${slug}:`, error);
    return undefined;
  }
}

export async function getJobs(params: {
  department?: string;
  type?: string;
  search?: string;
} = {}): Promise<JobPosting[]> {
  const wpUrl = getWordPressUrl();
  if (!wpUrl) return [];

  try {
    const query = new URLSearchParams();
    query.set('per_page', '100');
    if (params.search) query.set('search', params.search);

    const res = await fetch(`${wpUrl}/wp-json/wp/v2/jobs?${query.toString()}`, {
      cache: 'no-store'
    });

    if (!res.ok) throw new Error('Failed to fetch jobs');
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }
    const wpJobs = await res.json() as WordPressJob[];
    let jobs = wpJobs.map(mapWordPressJob);

    if (params.department) {
      const dept = params.department.toLowerCase();
      jobs = jobs.filter((j: JobPosting) => j.department.toLowerCase() === dept);
    }
    if (params.type) {
      const type = params.type.toLowerCase();
      jobs = jobs.filter((j: JobPosting) => j.type.toLowerCase() === type);
    }

    return jobs.sort((a: JobPosting, b: JobPosting) => {
      const aOrder = a.displayOrder ?? 0;
      const bOrder = b.displayOrder ?? 0;
      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }
      return a.title.localeCompare(b.title);
    });
  } catch (error) {
    console.error('WordPress jobs fetch error:', error);
    return [];
  }
}

export async function getJobById(id: string): Promise<JobPosting | undefined> {
  const wpUrl = getWordPressUrl();
  if (!wpUrl) return undefined;

  try {
    const res = await fetch(`${wpUrl}/wp-json/wp/v2/jobs/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) return undefined;
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return undefined;
    const wpJob = await res.json() as WordPressJob;
    return mapWordPressJob(wpJob);
  } catch (error) {
    console.error(`WordPress job fetch error for ID ${id}:`, error);
    return undefined;
  }
}

async function getCategoryIdBySlug(slug: string): Promise<number | undefined> {
  const wpUrl = getWordPressUrl();
  if (!wpUrl) return undefined;
  try {
    const res = await fetch(`${wpUrl}/wp-json/wp/v2/categories?slug=${encodeURIComponent(slug)}`, {
      cache: 'no-store'
    });
    if (!res.ok) return undefined;
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return undefined;
    const cats = await res.json();
    return cats[0]?.id;
  } catch {
    return undefined;
  }
}

async function getTagIdBySlug(slug: string): Promise<number | undefined> {
  const wpUrl = getWordPressUrl();
  if (!wpUrl) return undefined;
  try {
    const res = await fetch(`${wpUrl}/wp-json/wp/v2/tags?slug=${encodeURIComponent(slug)}`, {
      cache: 'no-store'
    });
    if (!res.ok) return undefined;
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return undefined;
    const tags = await res.json();
    return tags[0]?.id;
  } catch {
    return undefined;
  }
}

export async function getCategories(): Promise<Category[]> {
  const wpUrl = getWordPressUrl();
  if (!wpUrl) return [];

  try {
    const res = await fetch(`${wpUrl}/wp-json/wp/v2/categories?hide_empty=true`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error();
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) throw new Error('Not JSON');
    const cats = await res.json() as Array<{ id: number; name: string; slug: string }>;
    return cats.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug
    }));
  } catch {
    return [];
  }
}