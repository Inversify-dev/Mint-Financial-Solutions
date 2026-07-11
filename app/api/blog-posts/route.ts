import { NextResponse } from 'next/server';
import { getBlogPosts } from '../../../lib/cms';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const perPage = parseInt(searchParams.get('perPage') || '3', 10);
    
    const data = await getBlogPosts({ perPage });
    return NextResponse.json(data);
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Failed to proxy blog posts:', err);
    return NextResponse.json(
      { posts: [], totalPosts: 0, totalPages: 1, error: err.message },
      { status: 500 }
    );
  }
}
