import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const envUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const diagnostics: Record<string, any> = {
    envWordpressUrlExists: !!envUrl,
    envWordpressUrlValue: envUrl || 'NOT_SET',
    time: new Date().toISOString(),
  };

  // Try direct fetch to WordPress
  const targetUrl = envUrl || 'http://mintb2b.solutions';
  try {
    const start = Date.now();
    const res = await fetch(`${targetUrl}/wp-json/wp/v2/posts?per_page=1`, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      }
    });
    diagnostics.fetchSuccess = res.ok;
    diagnostics.fetchStatus = res.status;
    diagnostics.fetchTimeMs = Date.now() - start;
    diagnostics.contentType = res.headers.get('content-type');
    const text = await res.text();
    diagnostics.bodySnippet = text.slice(0, 300);
  } catch (err: unknown) {
    const error = err as Error;
    diagnostics.fetchSuccess = false;
    diagnostics.fetchErrorName = error.name;
    diagnostics.fetchErrorMessage = error.message;
    diagnostics.fetchErrorStack = error.stack;
  }

  return NextResponse.json(diagnostics);
}
