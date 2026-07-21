import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // 1. Gather fields
    const firstName = formData.get('firstName') as string || '';
    const lastName = formData.get('lastName') as string || '';
    const email = formData.get('email') as string || '';
    const phone = formData.get('phone') as string || '';
    const country = formData.get('country') as string || '';
    const linkedin = formData.get('linkedin') as string || '';
    const portfolio = formData.get('portfolio') as string || '';
    const coverLetter = formData.get('coverLetter') as string || '';
    const jobTitle = formData.get('jobTitle') as string || 'General Application';
    const recaptchaToken = formData.get('recaptchaToken') as string || '';
    const resume = formData.get('resume') as File | null;

    // 2. Validate inputs
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !resume) {
      return NextResponse.json({ message: 'Missing required application fields.' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Invalid email address format.' }, { status: 400 });
    }

    // Resume validation
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const lowerFilename = resume.name.toLowerCase();
    const hasValidExtension = allowedExtensions.some(ext => lowerFilename.endsWith(ext));
    const isDocMime = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ].includes(resume.type);

    if (!hasValidExtension && !isDocMime) {
      return NextResponse.json({ message: 'Invalid file type. Only PDF, DOC, and DOCX are accepted.' }, { status: 400 });
    }

    // File size limit: 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (resume.size > MAX_SIZE) {
      return NextResponse.json({ message: 'File is too large. Maximum size allowed is 10MB.' }, { status: 400 });
    }

    const wpBase = (process.env.NEXT_PUBLIC_WORDPRESS_URL || '').replace(/\/+$/, '') || 'http://mintb2b.solutions';
    if (!wpBase) {
      return NextResponse.json({ message: 'WordPress URL is not configured.' }, { status: 500 });
    }

    // 4. Construct form data payload for the custom public WordPress endpoint
    const wpFormData = new FormData();
    wpFormData.append('first_name', firstName);
    wpFormData.append('last_name', lastName);
    wpFormData.append('email', email);
    wpFormData.append('phone', phone);
    wpFormData.append('country', country);
    wpFormData.append('linkedin', linkedin);
    wpFormData.append('portfolio', portfolio);
    wpFormData.append('cover_letter', coverLetter);
    wpFormData.append('job_title', jobTitle);
    wpFormData.append('resume', resume);

    const wpResponse = await fetch(`${wpBase}/wp-json/mint/v1/apply`, {
      method: 'POST',
      body: wpFormData
    });

    if (!wpResponse.ok) {
      const errorText = await wpResponse.text();
      console.error('WordPress Application Custom Endpoint Error:', errorText);
      return NextResponse.json({ message: 'Failed to submit application details to the CMS.' }, { status: 500 });
    }

    const wpData = await wpResponse.json();

    return NextResponse.json({
      success: true,
      message: 'Your application has been received successfully.',
      data: wpData
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Application Submission Exception:', err);
    return NextResponse.json({ message: err.message || 'An internal error occurred.' }, { status: 500 });
  }
}
