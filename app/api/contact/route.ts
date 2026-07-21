import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, company, role, email, phone, service, message } = body;

    // 1. Basic Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { message: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    // 2. WordPress Endpoint URL
    const wpBase = (process.env.NEXT_PUBLIC_WORDPRESS_URL || '').replace(/\/+$/, '') || 'http://mintb2b.solutions';

    // 3. Send Contact Enquiry to WordPress Custom Endpoint
    const wpResponse = await fetch(`${wpBase}/wp-json/mint/v1/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        company,
        role,
        email,
        phone,
        service,
        message,
      }),
    });

    if (!wpResponse.ok) {
      const errorText = await wpResponse.text();
      console.error('WordPress Contact Enquiry Endpoint Error:', errorText);
      return NextResponse.json(
        { message: 'Failed to submit contact enquiry to WordPress.' },
        { status: 500 }
      );
    }

    const wpData = await wpResponse.json();

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully.',
      data: wpData,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Contact API Error:', err);
    return NextResponse.json(
      { message: err.message || 'Internal server error processing enquiry.' },
      { status: 500 }
    );
  }
}
